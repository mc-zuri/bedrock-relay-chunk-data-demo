import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class LevelEventGenericHandler {
  static register(client: BedrockClientBase) {
    const handler = new LevelEventGenericHandler(client);
    client.serverEvents.on("level_event_generic", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_level_event_generic): void {}
}
