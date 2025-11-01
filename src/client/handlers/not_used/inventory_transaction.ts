import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class InventoryTransactionHandler {
  static register(client: BedrockClientBase) {
    const handler = new InventoryTransactionHandler(client);
    client.serverEvents.on("inventory_transaction", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_inventory_transaction): void {}
}
