import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class GameTestRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new GameTestRequestHandler(client);
    client.serverEvents.on("game_test_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_game_test_request): void {}
}
