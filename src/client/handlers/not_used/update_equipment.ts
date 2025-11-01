import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateEquipmentHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateEquipmentHandler(client);
    client.serverEvents.on("update_equipment", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_equipment): void {}
}
