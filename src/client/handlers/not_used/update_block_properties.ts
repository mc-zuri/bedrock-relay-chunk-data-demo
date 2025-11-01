import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateBlockPropertiesHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateBlockPropertiesHandler(client);
    client.serverEvents.on("update_block_properties", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_block_properties): void {}
}
