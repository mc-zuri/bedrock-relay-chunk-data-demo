import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class DeathInfoHandler {
  static register(client: BedrockClientBase) {
    const handler = new DeathInfoHandler(client);
    client.serverEvents.on("death_info", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_death_info): void {}
}
