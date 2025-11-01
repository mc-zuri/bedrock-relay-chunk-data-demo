import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ShowProfileHandler {
  static register(client: BedrockClientBase) {
    const handler = new ShowProfileHandler(client);
    client.serverEvents.on("show_profile", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_show_profile): void {}
}
