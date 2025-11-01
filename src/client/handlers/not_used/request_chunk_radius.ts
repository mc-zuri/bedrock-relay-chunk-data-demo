import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RequestChunkRadiusHandler {
  static register(client: BedrockClientBase) {
    const handler = new RequestChunkRadiusHandler(client);
    client.serverEvents.on("request_chunk_radius", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_request_chunk_radius): void {}
}
