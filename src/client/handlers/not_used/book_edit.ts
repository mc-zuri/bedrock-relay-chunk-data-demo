import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class BookEditHandler {
  static register(client: BedrockClientBase) {
    const handler = new BookEditHandler(client);
    client.serverEvents.on("book_edit", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_book_edit): void {}
}
