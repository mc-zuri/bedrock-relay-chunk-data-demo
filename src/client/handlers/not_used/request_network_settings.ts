import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RequestNetworkSettingsHandler {
  static register(client: BedrockClientBase) {
    const handler = new RequestNetworkSettingsHandler(client);
    client.serverEvents.on("request_network_settings", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_request_network_settings): void {}
}
