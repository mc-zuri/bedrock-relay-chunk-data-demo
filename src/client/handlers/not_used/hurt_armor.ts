import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class HurtArmorHandler {
  static register(client: BedrockClientBase) {
    const handler = new HurtArmorHandler(client);
    client.serverEvents.on("hurt_armor", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_hurt_armor): void {}
}
