import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AwardAchievementHandler {
  static register(client: BedrockClientBase) {
    const handler = new AwardAchievementHandler(client);
    client.serverEvents.on("award_achievement", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_award_achievement): void {}
}
