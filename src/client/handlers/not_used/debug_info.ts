import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class DebugInfoHandler {
  static register(client: BedrockClientBase) {
    const handler = new DebugInfoHandler(client);
    client.serverEvents.on("debug_info", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_debug_info): void {}
}
