import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class FilterTextPacketHandler {
  static register(client: BedrockClientBase) {
    const handler = new FilterTextPacketHandler(client);
    client.serverEvents.on("filter_text_packet", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_filter_text_packet): void {}
}
