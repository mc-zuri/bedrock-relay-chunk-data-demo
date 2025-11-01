import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetLastHurtByHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetLastHurtByHandler(client);
    client.serverEvents.on("set_last_hurt_by", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_last_hurt_by): void {}
}
