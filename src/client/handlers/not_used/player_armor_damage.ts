import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlayerArmorDamageHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayerArmorDamageHandler(client);
    client.serverEvents.on("player_armor_damage", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_player_armor_damage): void {}
}
