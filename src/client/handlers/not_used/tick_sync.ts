import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class TickSyncHandler {
  static register(client: BedrockClientBase) {
    const handler = new TickSyncHandler(client);
    client.serverEvents.on("tick_sync", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_tick_sync): void {}
}
