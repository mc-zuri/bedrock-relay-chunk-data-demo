import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MapCreateLockedCopyHandler {
  static register(client: BedrockClientBase) {
    const handler = new MapCreateLockedCopyHandler(client);
    client.serverEvents.on("map_create_locked_copy", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_map_create_locked_copy): void {}
}
