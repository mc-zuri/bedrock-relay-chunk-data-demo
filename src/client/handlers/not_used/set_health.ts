import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetHealthHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetHealthHandler(client);
    client.serverEvents.on("set_health", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_health): void {}
}
