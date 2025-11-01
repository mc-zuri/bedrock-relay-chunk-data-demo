import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PacketViolationWarningHandler {
  static register(client: BedrockClientBase) {
    const handler = new PacketViolationWarningHandler(client);
    client.serverEvents.on("packet_violation_warning", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_packet_violation_warning): void {}
}
