import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AddPaintingHandler {
  static register(client: BedrockClientBase) {
    const handler = new AddPaintingHandler(client);
    client.serverEvents.on("add_painting", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_add_painting): void {}
}
