import EventEmitter from "events";
import type { World, WorldSync } from "prismarine-world/types/world.js";
import type { ClientEvents } from "../types/client-events.ts";
import type { BedrockEntity } from "../types/bedrock-entity.ts";
import type { BedrockClientBase } from "../client/bedrock-client-base.ts";
import { Vec3 } from "vec3";
import type { Socket } from "socket.io";

export function getBufferFromStream(stream: any) {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.from([]);
    stream.on("data", (buf: Buffer) => {
      buffer = Buffer.concat([buffer, buf]);
    });
    stream.on("end", () => resolve(buffer));
    stream.on("error", reject);
  });
}

function spiral(X: number, Y: number, fun: (x: number, y: number) => unknown) {
  // TODO: move that to spiralloop package
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = -1;
  const N = Math.max(X, Y) * Math.max(X, Y);
  const hX = X / 2;
  const hY = Y / 2;
  for (let i = 0; i < N; i++) {
    if (-hX < x && x <= hX && -hY < y && y <= hY) {
      fun(x, y);
    }
    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      const tmp = dx;
      dx = -dy;
      dy = tmp;
    }
    x += dx;
    y += dy;
  }
}

class ViewRect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  constructor(cx: number, cz: number, viewDistance: number) {
    this.x0 = cx - viewDistance;
    this.x1 = cx + viewDistance;
    this.z0 = cz - viewDistance;
    this.z1 = cz + viewDistance;
  }

  contains(x: number, z: number) {
    return this.x0 < x && x <= this.x1 && this.z0 < z && z <= this.z1;
  }
}

function chunkPos(pos: { x: number; z: number }) {
  const x = Math.floor(pos.x / 16);
  const z = Math.floor(pos.z / 16);
  return [x, z];
}

export class WorldView extends EventEmitter {
  world: WorldSync;
  viewDistance: number;
  loadedChunks: Record<string, boolean>;
  lastPos: Vec3;
  emitter: Socket;
  listeners: any;

  constructor(world: WorldSync, viewDistance: number, position = new Vec3(0, 0, 0), emitter: Socket) {
    super();
    this.world = world;
    this.viewDistance = viewDistance;
    this.loadedChunks = {};
    this.lastPos = new Vec3(0, 0, 0).update(position);
    this.emitter = emitter || this;

    this.listeners = {};
    this.emitter.on("mouseClick", async (click: any) => {
      const ori = new Vec3(click.origin.x, click.origin.y, click.origin.z);
      const dir = new Vec3(click.direction.x, click.direction.y, click.direction.z);
      const block = await this.world.raycast(ori, dir, 256);
      if (!block) return;
      this.emit("blockClicked", block, block.face, click.button);
    });
  }

  listenToBot(client: BedrockClientBase) {
    const worldView = this;

    this.listeners[client.userName] = {
      // 'move': botPosition,
      entitySpawn: function (e: BedrockEntity) {
        //if (e === client.state.entities.entity) return;

        if (e.name === "unknown") {
          e.name = "zombie";
        }

        worldView.emitter.emit("entity", { id: e.id, name: e.name, pos: e.position, width: e.width, height: e.height, username: e.username });
      },
      entityMoved: function (e: BedrockEntity) {
        worldView.emitter.emit("entity", { id: e.id, pos: e.position, pitch: e.pitch, yaw: e.yaw });
      },
      entityGone: function (e: BedrockEntity) {
        worldView.emitter.emit("entity", { id: e.id, delete: true });
      },
      chunkColumnLoad: function (pos: any) {
        worldView.loadChunk(pos);
      },
      blockUpdate: function (oldBlock: any, newBlock: any) {
        const stateId = newBlock.stateId ? newBlock.stateId : (newBlock.type << 4) | newBlock.metadata;
        worldView.emitter.emit("blockUpdate", { pos: oldBlock.position, stateId });
      },
    };

    for (const [evt, listener] of Object.entries(this.listeners[client.userName])) {
      client.clientEvents.on(evt as any, listener as any);
    }

    for (const id in client.state.entities.entities) {
      const e = client.state.entities.entities[id];
      if (e && e !== client.state.entities.entity) {
        this.emitter.emit("entity", { id: e.id, name: e.name, pos: e.position, width: e.width, height: e.height, username: e.username });
      }
    }
  }

  removeListenersFromBot(client: BedrockClientBase) {
    for (const [evt, listener] of Object.entries(this.listeners[client.userName])) {
      client.clientEvents.removeListener(evt as any, listener as any);
    }
    delete this.listeners[client.userName];
  }

  async init(pos: Vec3) {
    const [botX, botZ] = chunkPos(pos);

    const positions: Vec3[] = [];
    spiral(this.viewDistance * 2, this.viewDistance * 2, (x, z) => {
      const p = new Vec3((botX! + x) * 16, 0, (botZ! + z) * 16);
      positions.push(p);
    });

    this.lastPos.update(pos);
    await this._loadChunks(positions);
  }

  async _loadChunks(positions: Vec3[], sliceSize = 5, waitTime = 0) {
    for (let i = 0; i < positions.length; i += sliceSize) {
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      await Promise.all(positions.slice(i, i + sliceSize).map((p) => this.loadChunk(p)));
    }
  }

  async loadChunk(pos: Vec3) {
    const [botX, botZ] = chunkPos(this.lastPos);
    const dx = Math.abs(botX! - Math.floor(pos.x / 16));
    const dz = Math.abs(botZ! - Math.floor(pos.z / 16));
    if (dx < this.viewDistance && dz < this.viewDistance) {
      const column = await this.world.getColumnAt(pos);
      if (column) {
        const chunk = column.toJson();
        this.emitter.emit("loadChunk", { x: pos.x, z: pos.z, chunk });
        this.loadedChunks[`${pos.x},${pos.z}`] = true;
      }
    }
  }

  unloadChunk(pos: Vec3) {
    this.emitter.emit("unloadChunk", { x: pos.x, z: pos.z });
    delete this.loadedChunks[`${pos.x},${pos.z}`];
  }

  async updatePosition(pos: Vec3, force = false) {
    const [lastX, lastZ] = chunkPos(this.lastPos);
    const [botX, botZ] = chunkPos(pos);
    if (lastX !== botX || lastZ !== botZ || force) {
      const newView = new ViewRect(botX!, botZ!, this.viewDistance);
      for (const coords of Object.keys(this.loadedChunks)) {
        const x = parseInt(coords.split(",")[0]!);
        const z = parseInt(coords.split(",")[1]!);
        const p = new Vec3(x, 0, z);
        if (!newView.contains(Math.floor(x / 16), Math.floor(z / 16))) {
          this.unloadChunk(p);
        }
      }
      const positions: Vec3[] = [];
      spiral(this.viewDistance * 2, this.viewDistance * 2, (x, z) => {
        const p = new Vec3((botX! + x) * 16, 0, (botZ! + z) * 16);
        if (!this.loadedChunks[`${p.x},${p.z}`]) {
          positions.push(p);
        }
      });
      this.lastPos.update(pos);
      await this._loadChunks(positions);
    } else {
      this.lastPos.update(pos);
    }
  }
}
