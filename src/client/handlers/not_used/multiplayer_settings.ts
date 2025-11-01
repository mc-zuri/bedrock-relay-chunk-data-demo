import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MultiplayerSettingsHandler {
  static register(client: BedrockClientBase) {
    const handler = new MultiplayerSettingsHandler(client);
    client.serverEvents.on("multiplayer_settings", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_multiplayer_settings): void {}
}
