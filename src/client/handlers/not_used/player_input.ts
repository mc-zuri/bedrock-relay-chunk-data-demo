import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PlayerInputHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayerInputHandler(client);
    client.serverEvents.on("player_input", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_player_input): void {}
}
