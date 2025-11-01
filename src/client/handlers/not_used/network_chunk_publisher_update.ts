import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class NetworkChunkPublisherUpdateHandler {
  static register(client: BedrockClientBase) {
    const handler = new NetworkChunkPublisherUpdateHandler(client);
    client.serverEvents.on("network_chunk_publisher_update", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_network_chunk_publisher_update): void {}
}
