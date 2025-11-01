import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class NpcDialogueHandler {
  static register(client: BedrockClientBase) {
    const handler = new NpcDialogueHandler(client);
    client.serverEvents.on("npc_dialogue", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_npc_dialogue): void {}
}
