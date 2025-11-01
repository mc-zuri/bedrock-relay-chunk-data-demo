import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SyncEntityPropertyHandler {
  static register(client: BedrockClientBase) {
    const handler = new SyncEntityPropertyHandler(client);
    client.serverEvents.on("sync_entity_property", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_sync_entity_property): void {}
}
