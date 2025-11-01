import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlayerVideoCaptureHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayerVideoCaptureHandler(client);
    client.serverEvents.on("player_video_capture", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_player_video_capture): void {}
}
