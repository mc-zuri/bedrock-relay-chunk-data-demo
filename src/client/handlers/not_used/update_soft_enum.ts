import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class UpdateSoftEnumHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateSoftEnumHandler(client);
    client.serverEvents.on("update_soft_enum", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_update_soft_enum): void {}
}
