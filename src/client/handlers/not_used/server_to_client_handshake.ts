import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerToClientHandshakeHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerToClientHandshakeHandler(client);
    client.serverEvents.on("server_to_client_handshake", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_server_to_client_handshake): void {}
}
