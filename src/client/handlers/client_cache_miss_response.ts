import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";

export class ClientCacheMissResponseHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientCacheMissResponseHandler(client);
    client.serverEvents.on("client_cache_miss_response", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_client_cache_miss_response): void {
    const acks = [];
    for (const { hash, payload } of packet.blobs) {
      const name = hash.toString();
      this.client.state.world.blobStore.updatePending(name, { buffer: payload });
      acks.push(hash);
    }

    // Send back an ACK
    this.client.queue("client_cache_blob_status", {
      misses: 0,
      haves: acks.length,
      have: [],
      missing: acks,
    });
  }
}
