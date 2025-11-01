import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class JigsawStructureDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new JigsawStructureDataHandler(client);
    client.serverEvents.on("jigsaw_structure_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_jigsaw_structure_data): void {}
}
