import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class BlockEventHandler {
  static register(client: BedrockClientBase) {
    const handler = new BlockEventHandler(client);
    client.serverEvents.on("block_event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_block_event): void {}
}
