import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class InventoryContentHandler {
  static register(client: BedrockClientBase) {
    const handler = new InventoryContentHandler(client);
    client.serverEvents.on("inventory_content", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_inventory_content): void {}
}
