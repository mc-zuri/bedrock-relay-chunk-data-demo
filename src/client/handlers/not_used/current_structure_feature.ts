import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CurrentStructureFeatureHandler {
  static register(client: BedrockClientBase) {
    const handler = new CurrentStructureFeatureHandler(client);
    client.serverEvents.on("current_structure_feature", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_current_structure_feature): void {}
}
