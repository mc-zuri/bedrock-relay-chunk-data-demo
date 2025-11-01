import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlayerFogHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayerFogHandler(client);
    client.serverEvents.on("player_fog", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_player_fog): void {}
}
