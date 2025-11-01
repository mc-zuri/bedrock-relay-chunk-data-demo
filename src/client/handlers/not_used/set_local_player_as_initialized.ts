import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetLocalPlayerAsInitializedHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetLocalPlayerAsInitializedHandler(client);
    client.serverEvents.on("set_local_player_as_initialized", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_local_player_as_initialized): void {}
}
