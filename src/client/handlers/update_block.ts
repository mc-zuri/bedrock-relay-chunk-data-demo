import { Vec3 } from "vec3";

import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import type { BedrockChunk } from "prismarine-chunk";

export class UpdateBlockHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateBlockHandler(client);
    client.serverEvents.on("update_block", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  async handle(packet: protocolTypes.packet_update_block): void {
    const pos = new Vec3(packet.position.x, packet.position.y, packet.position.z);
    const world = this.client.state.world.world;
    const chunk = world.getColumnAt(pos);
    const newBlock = this.client.registry.blocksByRuntimeId[packet.block_runtime_id];
    if (chunk) {
      const Y = pos.y >> 4;
      let sec = chunk.sections[chunk.co + Y];
      if (!sec) {
        sec = new chunk.Section(chunk.registry, chunk.Block, { y: Y, subChunkVersion: chunk.subChunkVersion });
        chunk.sections[chunk.co + Y] = sec;
      }

      chunk.setBlock({ ...packet.position, l: packet.layer } as any, {
        ...(newBlock as any),
        stateId: packet.block_runtime_id,
      });
    }
  }
}
