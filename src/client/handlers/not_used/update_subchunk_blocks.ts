import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateSubchunkBlocksHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateSubchunkBlocksHandler(client);
    client.serverEvents.on("update_subchunk_blocks", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_subchunk_blocks): void {}
}
