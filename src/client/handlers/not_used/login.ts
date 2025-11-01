import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class LoginHandler {
  static register(client: BedrockClientBase) {
    const handler = new LoginHandler(client);
    client.serverEvents.on("login", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_login): void {}
}
