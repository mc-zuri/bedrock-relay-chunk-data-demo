import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateClientInputLocksHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateClientInputLocksHandler(client);
    client.serverEvents.on("update_client_input_locks", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_client_input_locks): void {}
}
