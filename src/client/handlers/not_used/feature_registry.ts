import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class FeatureRegistryHandler {
  static register(client: BedrockClientBase) {
    const handler = new FeatureRegistryHandler(client);
    client.serverEvents.on("feature_registry", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_feature_registry): void {}
}
