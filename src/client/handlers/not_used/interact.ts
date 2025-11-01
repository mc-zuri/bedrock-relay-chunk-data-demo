import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class InteractHandler {
  static register(client: BedrockClientBase) {
    const handler = new InteractHandler(client);
    client.serverEvents.on("interact", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_interact): void {}
}
