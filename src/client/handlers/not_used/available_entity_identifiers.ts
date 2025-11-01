import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AvailableEntityIdentifiersHandler {
  static register(client: BedrockClientBase) {
    const handler = new AvailableEntityIdentifiersHandler(client);
    client.serverEvents.on("available_entity_identifiers", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_available_entity_identifiers): void {}
}
