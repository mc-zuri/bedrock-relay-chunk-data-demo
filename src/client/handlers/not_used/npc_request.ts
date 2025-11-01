import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class NpcRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new NpcRequestHandler(client);
    client.serverEvents.on("npc_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_npc_request): void {}
}
