import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class DimensionDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new DimensionDataHandler(client);
    client.serverEvents.on("dimension_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_dimension_data): void {}
}
