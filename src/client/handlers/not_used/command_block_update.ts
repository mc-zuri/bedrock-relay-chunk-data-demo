import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CommandBlockUpdateHandler {
  static register(client: BedrockClientBase) {
    const handler = new CommandBlockUpdateHandler(client);
    client.serverEvents.on("command_block_update", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_command_block_update): void {}
}
