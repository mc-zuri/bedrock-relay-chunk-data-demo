import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class LevelSoundEventV2Handler {
  static register(client: BedrockClientBase) {
    const handler = new LevelSoundEventV2Handler(client);
    client.serverEvents.on("level_sound_event_v2", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_level_sound_event_v2): void {}
}
