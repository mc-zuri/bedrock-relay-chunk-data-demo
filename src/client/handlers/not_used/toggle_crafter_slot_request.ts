import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ToggleCrafterSlotRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new ToggleCrafterSlotRequestHandler(client);
    client.serverEvents.on("toggle_crafter_slot_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_toggle_crafter_slot_request): void {}
}
