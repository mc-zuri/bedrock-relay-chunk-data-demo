import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";

export class ItemRegistryHandler {
  static register(client: BedrockClientBase) {
    const handler = new ItemRegistryHandler(client);
    client.serverEvents.on("item_registry", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_item_registry): void {
    this.client.registry.handleItemRegistry(params);
  }
}
