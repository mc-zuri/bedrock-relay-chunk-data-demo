import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientToServerHandshakeHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientToServerHandshakeHandler(client);
    client.serverEvents.on("client_to_server_handshake", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_client_to_server_handshake): void {}
}
