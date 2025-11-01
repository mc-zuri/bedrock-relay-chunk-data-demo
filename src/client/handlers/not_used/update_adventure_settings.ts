import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateAdventureSettingsHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateAdventureSettingsHandler(client);
    client.serverEvents.on("update_adventure_settings", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_adventure_settings): void {}
}
