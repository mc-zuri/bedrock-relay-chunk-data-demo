import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class InitiateWebSocketConnectionHandler {
  static register(client: BedrockClientBase) {
    const handler = new InitiateWebSocketConnectionHandler(client);
    client.serverEvents.on("initiate_web_socket_connection", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_initiate_web_socket_connection): void {}
}
