import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class GameRulesChangedHandler {
  static register(client: BedrockClientBase) {
    const handler = new GameRulesChangedHandler(client);
    client.serverEvents.on("game_rules_changed", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_game_rules_changed): void {}
}
