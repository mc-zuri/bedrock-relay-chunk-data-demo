import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientCacheStatusHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientCacheStatusHandler(client);
    client.serverEvents.on("client_cache_status", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_client_cache_status): void {}
}
