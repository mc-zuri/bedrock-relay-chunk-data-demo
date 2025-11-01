import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CraftingEventHandler {
  static register(client: BedrockClientBase) {
    const handler = new CraftingEventHandler(client);
    client.serverEvents.on("crafting_event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_crafting_event): void {}
}
