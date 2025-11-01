import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class OnScreenTextureAnimationHandler {
  static register(client: BedrockClientBase) {
    const handler = new OnScreenTextureAnimationHandler(client);
    client.serverEvents.on("on_screen_texture_animation", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_on_screen_texture_animation): void {}
}
