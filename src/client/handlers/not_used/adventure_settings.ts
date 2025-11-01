import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AdventureSettingsHandler {
  static register(client: BedrockClientBase) {
    const handler = new AdventureSettingsHandler(client);
    client.serverEvents.on("adventure_settings", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_adventure_settings): void {}
}
