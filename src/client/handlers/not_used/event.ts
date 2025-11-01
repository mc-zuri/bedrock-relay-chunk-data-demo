import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class EventHandler {
  static register(client: BedrockClientBase) {
    const handler = new EventHandler(client);
    client.serverEvents.on("event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_event): void {}
}
