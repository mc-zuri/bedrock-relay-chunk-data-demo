import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateClientOptionsHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateClientOptionsHandler(client);
    client.serverEvents.on("update_client_options", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_client_options): void {}
}
