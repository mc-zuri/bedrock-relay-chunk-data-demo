import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlaySoundHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlaySoundHandler(client);
    client.serverEvents.on("play_sound", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_play_sound): void {}
}
