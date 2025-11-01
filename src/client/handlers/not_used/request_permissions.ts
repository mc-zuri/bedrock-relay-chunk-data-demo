import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RequestPermissionsHandler {
  static register(client: BedrockClientBase) {
    const handler = new RequestPermissionsHandler(client);
    client.serverEvents.on("request_permissions", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_request_permissions): void {}
}
