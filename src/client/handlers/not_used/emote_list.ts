import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class EmoteListHandler {
  static register(client: BedrockClientBase) {
    const handler = new EmoteListHandler(client);
    client.serverEvents.on("emote_list", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_emote_list): void {}
}
