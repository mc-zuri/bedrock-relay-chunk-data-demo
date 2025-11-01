import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ItemStackResponseHandler {
  static register(client: BedrockClientBase) {
    const handler = new ItemStackResponseHandler(client);
    client.serverEvents.on("item_stack_response", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_item_stack_response): void {}
}
