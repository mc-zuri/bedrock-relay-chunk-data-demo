import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SubchunkRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new SubchunkRequestHandler(client);
    client.serverEvents.on("subchunk_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_subchunk_request): void {}
}
