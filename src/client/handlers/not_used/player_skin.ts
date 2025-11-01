import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlayerSkinHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayerSkinHandler(client);
    client.serverEvents.on("player_skin", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_player_skin): void {}
}
