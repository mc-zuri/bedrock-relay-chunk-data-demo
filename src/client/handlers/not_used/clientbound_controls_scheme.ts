import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientboundControlsSchemeHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientboundControlsSchemeHandler(client);
    client.serverEvents.on("clientbound_controls_scheme", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_clientbound_controls_scheme): void {}
}
