import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CraftingDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new CraftingDataHandler(client);
    client.serverEvents.on("crafting_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_crafting_data): void {}
}
