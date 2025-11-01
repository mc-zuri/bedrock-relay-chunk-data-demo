import { EventEmitter } from "events";
import type { BedrockClientBase } from "../client/bedrock-client-base.ts";
import { Server, Socket, type DefaultEventsMap } from "socket.io";
import { WorldView } from "./world-wiew.ts";
import express from "express";
import { createServer, Server as HttpServer } from "http";
import compression from "compression";
import path from "node:path";
import { Vec3 } from "vec3";
import mcData, { type IndexedData } from "minecraft-data";
import mcWorld from "prismarine-world";
import mcRegistry, { type Registry } from "prismarine-registry";
import mcChunk, { type PCChunk } from "prismarine-chunk";
import prismarineViewer from "prismarine-viewer";
import type { World, WorldSync } from "prismarine-world/types/world.js";

const NAMED_ENTITY_HEIGHT = 1.62;
const NAMED_ENTITY_WIDTH = 0.6;
const CROUCH_HEIGHT = NAMED_ENTITY_HEIGHT - 0.08;

let mcChunkLoader = mcChunk as any as (mcVersionOrRegistry: string | Registry) => typeof PCChunk;
let mcWorldLoader = mcWorld as any as (mcVersion: string) => typeof World;

function worldGenerator(chunkX: number, chunkZ: number, JavaChunkColumn: any, client: BedrockClientBase, javaMcData: IndexedData) {
  const chunk = new JavaChunkColumn({});
  for (let y = -64; y < 225; y++) {
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        const posInChunk = new Vec3(x, y, z);
        const pos = new Vec3(chunkX * 16 + x, y, chunkZ * 16 + z);
        let bedrockStateId = client.state.world.world.getBlockStateId(pos);

        let bedrockBlock = client.registry.blocksByRuntimeId[bedrockStateId]!;
        let javaState = javaMcData.blocksByName[bedrockBlock?.name!];
        if (!javaState) {
          chunk.setBlockStateId(posInChunk, 0);
        } else if (bedrockBlock.defaultState === bedrockBlock.stateId) {
          chunk.setBlockStateId(posInChunk, javaState.defaultState);
        } else {
          chunk.setBlockStateId(posInChunk, javaState.defaultState);
          //chunk.setBlockStateId(posInChunk, javaState.defaultState + (bedrockBlock.defaultState - bedrockBlock.defaultState));
        }
      }
    }
  }
  return chunk;
}

function createProxyWorld(bot: BedrockClientBase, javaVersion: string): WorldSync {
  const javaMcData = mcData(javaVersion);
  const javaRegistry = mcRegistry(javaVersion);
  const JavaChunkColumn = mcChunkLoader(javaRegistry);
  const javaWorldContructor = mcWorldLoader(javaVersion);
  const javaWorld = new javaWorldContructor((x, z) => worldGenerator(x, z, JavaChunkColumn, bot, javaMcData), null, 0);

  return javaWorld as any as WorldSync;
}

export function setupWebView(client: BedrockClientBase, { viewDistance = 6, firstPerson = false, port = 3000, prefix = "" }) {
  (BigInt as any).prototype.toJSON = function () {
    return this.toString();
  };

  const world = createProxyWorld(client, "1.21.4");

  const app = express();
  const http = createServer(app);

  const io: Server = new Server(http, { path: "/socket.io" });

  app.use(compression());
  app.use("/", express.static(path.resolve("node_modules", "prismarine-viewer", "public")));

  const sockets: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>[] = [];
  const primitives: any = {};

  const viewer: EventEmitter = new EventEmitter();

  // viewer.erase = (id) => {
  //   delete primitives[id];
  //   for (const socket of sockets) {
  //     socket.emit("primitive", { id });
  //   }
  // };

  // viewer.drawBoxGrid = (id, start, end, color = "aqua") => {
  //   primitives[id] = { type: "boxgrid", id, start, end, color };
  //   for (const socket of sockets) {
  //     socket.emit("primitive", primitives[id]);
  //   }
  // };

  // viewer.drawLine = (id, points, color = 0xff0000) => {
  //   primitives[id] = { type: "line", id, points, color };
  //   for (const socket of sockets) {
  //     socket.emit("primitive", primitives[id]);
  //   }
  // };

  // viewer.drawPoints = (id, points, color = 0xff0000, size = 5) => {
  //   primitives[id] = { type: "points", id, points, color, size };
  //   for (const socket of sockets) {
  //     socket.emit("primitive", primitives[id]);
  //   }
  // };

  io.on("connection", (socket) => {
    socket.emit("version", "1.21.4");
    sockets.push(socket);

    const worldView = new WorldView(world, viewDistance, client.state.entities.entity.position, socket);
    worldView.init(client.state.entities.entity.position);

    worldView.on("blockClicked", (block, face, button) => {
      viewer.emit("blockClicked", block, face, button);
    });

    for (const id in primitives) {
      socket.emit("primitive", primitives[id]);
    }

    let pos = new Vec3(0, -200, 0);
    function botPosition() {
      if (client.state.entities.entity.position.x == pos.x && client.state.entities.entity.position.y == pos.y && client.state.entities.entity.position.z == pos.z) {
        return;
      }

      const packet: any = {
        pos: {
          x: client.state.entities.entity.position.x,
          y: client.state.entities.entity.position.y - NAMED_ENTITY_HEIGHT,
          z: client.state.entities.entity.position.z,
        },
        yaw: client.state.entities.entity.yaw,
        addMesh: true,
      };
      if (firstPerson) {
        packet.pitch = client.state.entities.entity.pitch;
      }
      socket.emit("position", packet);
      worldView.updatePosition(client.state.entities.entity.position);
    }

    client.clientEvents.on("move", botPosition);
    botPosition();
    worldView.listenToBot(client);
    socket.on("disconnect", () => {
      client.clientEvents.removeListener("move", botPosition);
      worldView.removeListenersFromBot(client);
      sockets.splice(sockets.indexOf(socket), 1);
    });
    pos.set(client.state.entities.entity.position.x, client.state.entities.entity.position.y, client.state.entities.entity.position.z);
  });

  http.listen(port, () => {
    console.log(`Prismarine viewer web server running on *:${port}`);
  });

  // viewer.close = () => {
  //   http.close();
  //   for (const socket of sockets) {
  //     socket.disconnect();
  //   }
  // };
}
