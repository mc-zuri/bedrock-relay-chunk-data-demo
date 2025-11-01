import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PurchaseReceiptHandler {
  static register(client: BedrockClientBase) {
    const handler = new PurchaseReceiptHandler(client);
    client.serverEvents.on("purchase_receipt", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_purchase_receipt): void {}
}
