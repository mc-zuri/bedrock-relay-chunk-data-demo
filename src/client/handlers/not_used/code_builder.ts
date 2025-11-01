import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CodeBuilderHandler {
  static register(client: BedrockClientBase) {
    const handler = new CodeBuilderHandler(client);
    client.serverEvents.on("code_builder", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_code_builder): void {}
}
