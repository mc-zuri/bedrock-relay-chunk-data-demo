import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class BlockPickRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new BlockPickRequestHandler(client);
    client.serverEvents.on("block_pick_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_block_pick_request): void {}
}
