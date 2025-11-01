import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class StructureBlockUpdateHandler {
  static register(client: BedrockClientBase) {
    const handler = new StructureBlockUpdateHandler(client);
    client.serverEvents.on("structure_block_update", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_structure_block_update): void {}
}
