import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ChangeDimensionHandler {
  static register(client: BedrockClientBase) {
    const handler = new ChangeDimensionHandler(client);
    client.serverEvents.on("change_dimension", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_change_dimension): void {}
}
