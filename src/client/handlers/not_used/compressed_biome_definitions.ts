import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CompressedBiomeDefinitionsHandler {
  static register(client: BedrockClientBase) {
    const handler = new CompressedBiomeDefinitionsHandler(client);
    client.serverEvents.on("compressed_biome_definitions", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_compressed_biome_definitions): void {}
}
