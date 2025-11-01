import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PhotoInfoRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new PhotoInfoRequestHandler(client);
    client.serverEvents.on("photo_info_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_photo_info_request): void {}
}
