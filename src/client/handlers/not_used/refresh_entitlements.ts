import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RefreshEntitlementsHandler {
  static register(client: BedrockClientBase) {
    const handler = new RefreshEntitlementsHandler(client);
    client.serverEvents.on("refresh_entitlements", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_refresh_entitlements): void {}
}
