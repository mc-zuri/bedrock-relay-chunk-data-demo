import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class StopSoundHandler {
  static register(client: BedrockClientBase) {
    const handler = new StopSoundHandler(client);
    client.serverEvents.on("stop_sound", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_stop_sound): void {}
}
