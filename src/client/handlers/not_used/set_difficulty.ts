import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetDifficultyHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetDifficultyHandler(client);
    client.serverEvents.on("set_difficulty", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_difficulty): void {}
}
