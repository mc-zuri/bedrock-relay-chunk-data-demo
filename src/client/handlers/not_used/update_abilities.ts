import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateAbilitiesHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateAbilitiesHandler(client);
    client.serverEvents.on("update_abilities", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_abilities): void {}
}
