import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlayerUpdateEntityOverridesHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayerUpdateEntityOverridesHandler(client);
    client.serverEvents.on("player_update_entity_overrides", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_player_update_entity_overrides): void {}
}
