import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UnlockedRecipesHandler {
  static register(client: BedrockClientBase) {
    const handler = new UnlockedRecipesHandler(client);
    client.serverEvents.on("unlocked_recipes", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_unlocked_recipes): void {}
}
