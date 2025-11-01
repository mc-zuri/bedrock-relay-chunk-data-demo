import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CodeBuilderSourceHandler {
  static register(client: BedrockClientBase) {
    const handler = new CodeBuilderSourceHandler(client);
    client.serverEvents.on("code_builder_source", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_code_builder_source): void {}
}
