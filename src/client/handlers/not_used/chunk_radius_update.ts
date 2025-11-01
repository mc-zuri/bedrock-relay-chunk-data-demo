import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ChunkRadiusUpdateHandler {
  static register(client: BedrockClientBase) {
    const handler = new ChunkRadiusUpdateHandler(client);
    client.serverEvents.on("chunk_radius_update", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_chunk_radius_update): void {}
}
