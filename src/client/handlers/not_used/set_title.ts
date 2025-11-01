import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetTitleHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetTitleHandler(client);
    client.serverEvents.on("set_title", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_title): void {}
}
