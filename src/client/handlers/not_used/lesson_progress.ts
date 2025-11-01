import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class LessonProgressHandler {
  static register(client: BedrockClientBase) {
    const handler = new LessonProgressHandler(client);
    client.serverEvents.on("lesson_progress", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_lesson_progress): void {}
}
