import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ScriptCustomEventHandler {
  static register(client: BedrockClientBase) {
    const handler = new ScriptCustomEventHandler(client);
    client.serverEvents.on("script_custom_event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_script_custom_event): void {}
}
