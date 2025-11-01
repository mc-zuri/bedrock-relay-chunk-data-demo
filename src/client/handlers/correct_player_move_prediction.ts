import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";

export class CorrectPlayerMovePredictionHandler {
  static register(client: BedrockClientBase) {
    const handler = new CorrectPlayerMovePredictionHandler(client);
    client.serverEvents.on("correct_player_move_prediction", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_correct_player_move_prediction): void {
    debugger;
  }
}
