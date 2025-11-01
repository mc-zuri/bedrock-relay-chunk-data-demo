import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PhotoTransferHandler {
  static register(client: BedrockClientBase) {
    const handler = new PhotoTransferHandler(client);
    client.serverEvents.on("photo_transfer", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_photo_transfer): void {}
}
