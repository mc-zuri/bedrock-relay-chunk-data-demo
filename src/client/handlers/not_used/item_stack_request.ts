import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ItemStackRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new ItemStackRequestHandler(client);
    client.serverEvents.on("item_stack_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_item_stack_request): void {}
}
