import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SimpleEventHandler {
  static register(client: BedrockClientBase) {
    const handler = new SimpleEventHandler(client);
    client.serverEvents.on("simple_event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_simple_event): void {}
}
