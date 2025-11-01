import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientboundMapItemDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientboundMapItemDataHandler(client);
    client.serverEvents.on("clientbound_map_item_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_clientbound_map_item_data): void {}
}
