import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class TrimDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new TrimDataHandler(client);
    client.serverEvents.on("trim_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_trim_data): void {}
}
