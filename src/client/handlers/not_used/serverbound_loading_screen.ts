import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerboundLoadingScreenHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerboundLoadingScreenHandler(client);
    client.serverEvents.on("serverbound_loading_screen", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_serverbound_loading_screen): void {}
}
