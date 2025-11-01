import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CreativeContentHandler {
  static register(client: BedrockClientBase) {
    const handler = new CreativeContentHandler(client);
    client.serverEvents.on("creative_content", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_creative_content): void {}
}
