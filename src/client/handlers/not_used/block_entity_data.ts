import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class BlockEntityDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new BlockEntityDataHandler(client);
    client.serverEvents.on("block_entity_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_block_entity_data): void {}
}
