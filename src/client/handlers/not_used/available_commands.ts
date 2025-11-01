import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AvailableCommandsHandler {
  static register(client: BedrockClientBase) {
    const handler = new AvailableCommandsHandler(client);
    client.serverEvents.on("available_commands", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_available_commands): void {}
}
