import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MobArmorEquipmentHandler {
  static register(client: BedrockClientBase) {
    const handler = new MobArmorEquipmentHandler(client);
    client.serverEvents.on("mob_armor_equipment", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_mob_armor_equipment): void {}
}
