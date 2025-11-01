import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class NetworkSettingsHandler {
  static register(client: BedrockClientBase) {
    const handler = new NetworkSettingsHandler(client);
    client.serverEvents.on("network_settings", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_network_settings): void {}
}
