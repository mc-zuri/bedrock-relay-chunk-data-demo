import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ShowCreditsHandler {
  static register(client: BedrockClientBase) {
    const handler = new ShowCreditsHandler(client);
    client.serverEvents.on("show_credits", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_show_credits): void {}
}
