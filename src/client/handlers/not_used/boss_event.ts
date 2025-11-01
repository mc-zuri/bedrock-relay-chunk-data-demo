import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class BossEventHandler {
  static register(client: BedrockClientBase) {
    const handler = new BossEventHandler(client);
    client.serverEvents.on("boss_event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_boss_event): void {}
}
