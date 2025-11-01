import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerSettingsRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerSettingsRequestHandler(client);
    client.serverEvents.on("server_settings_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_server_settings_request): void {}
}
