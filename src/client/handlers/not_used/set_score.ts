import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetScoreHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetScoreHandler(client);
    client.serverEvents.on("set_score", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_score): void {}
}
