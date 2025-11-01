import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientboundCloseFormHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientboundCloseFormHandler(client);
    client.serverEvents.on("clientbound_close_form", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_clientbound_close_form): void {}
}
