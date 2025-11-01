import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CommandOutputHandler {
  static register(client: BedrockClientBase) {
    const handler = new CommandOutputHandler(client);
    client.serverEvents.on("command_output", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_command_output): void {}
}
