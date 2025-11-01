import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetPlayerInventoryOptionsHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetPlayerInventoryOptionsHandler(client);
    client.serverEvents.on("set_player_inventory_options", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_player_inventory_options): void {}
}
