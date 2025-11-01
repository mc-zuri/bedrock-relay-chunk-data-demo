import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class BiomeDefinitionListHandler {
  static register(client: BedrockClientBase) {
    const handler = new BiomeDefinitionListHandler(client);
    client.serverEvents.on("biome_definition_list", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_biome_definition_list): void {}
}
