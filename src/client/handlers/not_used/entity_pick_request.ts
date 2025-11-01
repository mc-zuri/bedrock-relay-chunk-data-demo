import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class EntityPickRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new EntityPickRequestHandler(client);
    client.serverEvents.on("entity_pick_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_entity_pick_request): void {}
}
