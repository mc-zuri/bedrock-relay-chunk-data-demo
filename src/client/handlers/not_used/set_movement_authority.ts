import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetMovementAuthorityHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetMovementAuthorityHandler(client);
    client.serverEvents.on("set_movement_authority", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_movement_authority): void {}
}
