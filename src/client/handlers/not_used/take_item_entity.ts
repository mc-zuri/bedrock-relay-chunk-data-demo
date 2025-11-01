import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class TakeItemEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new TakeItemEntityHandler(client);
    client.serverEvents.on("take_item_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_take_item_entity): void {}
}
