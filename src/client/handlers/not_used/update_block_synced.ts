import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateBlockSyncedHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateBlockSyncedHandler(client);
    client.serverEvents.on("update_block_synced", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_block_synced): void {}
}
