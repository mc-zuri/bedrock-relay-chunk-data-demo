import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CommandRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new CommandRequestHandler(client);
    client.serverEvents.on("command_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_command_request): void {}
}
