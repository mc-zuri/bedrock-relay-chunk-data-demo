import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AnimateEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new AnimateEntityHandler(client);
    client.serverEvents.on("animate_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_animate_entity): void {}
}
