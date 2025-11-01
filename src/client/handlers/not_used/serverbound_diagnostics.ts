import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerboundDiagnosticsHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerboundDiagnosticsHandler(client);
    client.serverEvents.on("serverbound_diagnostics", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_serverbound_diagnostics): void {}
}
