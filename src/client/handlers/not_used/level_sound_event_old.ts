import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class LevelSoundEventOldHandler {
  static register(client: BedrockClientBase) {
    const handler = new LevelSoundEventOldHandler(client);
    client.serverEvents.on("level_sound_event_old", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_level_sound_event_old): void {}
}
