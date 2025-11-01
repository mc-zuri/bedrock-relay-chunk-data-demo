import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";

export class PlayStatusHandler {
  static register(client: BedrockClientBase) {
    const handler = new PlayStatusHandler(client);
    client.serverEvents.on("play_status", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_play_status): void {
    if (packet.status === "player_spawn") {
      this.client.clientEvents.emit("entitySpawn", this.client.state.entities.entity);
    }
  }
}
