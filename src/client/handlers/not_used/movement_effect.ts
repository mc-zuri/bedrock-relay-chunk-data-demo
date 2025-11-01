import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MovementEffectHandler {
  static register(client: BedrockClientBase) {
    const handler = new MovementEffectHandler(client);
    client.serverEvents.on("movement_effect", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_movement_effect): void {}
}
