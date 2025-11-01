import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ScriptMessageHandler {
  static register(client: BedrockClientBase) {
    const handler = new ScriptMessageHandler(client);
    client.serverEvents.on("script_message", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_script_message): void {}
}
