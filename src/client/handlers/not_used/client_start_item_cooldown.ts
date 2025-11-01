import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientStartItemCooldownHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientStartItemCooldownHandler(client);
    client.serverEvents.on("client_start_item_cooldown", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_client_start_item_cooldown): void {}
}
