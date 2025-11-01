import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientCacheBlobStatusHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientCacheBlobStatusHandler(client);
    client.serverEvents.on("client_cache_blob_status", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_client_cache_blob_status): void {}
}
