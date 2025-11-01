import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RequestAbilityHandler {
  static register(client: BedrockClientBase) {
    const handler = new RequestAbilityHandler(client);
    client.serverEvents.on("request_ability", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_request_ability): void {}
}
