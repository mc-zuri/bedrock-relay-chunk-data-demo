import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class TransferHandler {
  static register(client: BedrockClientBase) {
    const handler = new TransferHandler(client);
    client.serverEvents.on("transfer", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_transfer): void {}
}
