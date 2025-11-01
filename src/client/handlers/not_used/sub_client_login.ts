import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SubClientLoginHandler {
  static register(client: BedrockClientBase) {
    const handler = new SubClientLoginHandler(client);
    client.serverEvents.on("sub_client_login", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_sub_client_login): void {}
}
