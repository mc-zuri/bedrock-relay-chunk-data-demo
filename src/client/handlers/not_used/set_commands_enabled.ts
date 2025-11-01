import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetCommandsEnabledHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetCommandsEnabledHandler(client);
    client.serverEvents.on("set_commands_enabled", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_commands_enabled): void {}
}
