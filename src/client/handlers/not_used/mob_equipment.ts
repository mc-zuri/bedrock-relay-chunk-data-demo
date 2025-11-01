import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MobEquipmentHandler {
  static register(client: BedrockClientBase) {
    const handler = new MobEquipmentHandler(client);
    client.serverEvents.on("mob_equipment", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_mob_equipment): void {}
}
