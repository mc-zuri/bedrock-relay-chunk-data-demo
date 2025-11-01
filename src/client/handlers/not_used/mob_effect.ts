import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MobEffectHandler {
  static register(client: BedrockClientBase) {
    const handler = new MobEffectHandler(client);
    client.serverEvents.on("mob_effect", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_mob_effect): void {}
}
