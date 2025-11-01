import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class TextHandler {
  static register(client: BedrockClientBase) {
    const handler = new TextHandler(client);
    client.serverEvents.on("text", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_text): void {}
}
