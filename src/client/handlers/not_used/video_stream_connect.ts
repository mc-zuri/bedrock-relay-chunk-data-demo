import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class VideoStreamConnectHandler {
  static register(client: BedrockClientBase) {
    const handler = new VideoStreamConnectHandler(client);
    client.serverEvents.on("video_stream_connect", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_video_stream_connect): void {}
}
