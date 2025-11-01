import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetTimeHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetTimeHandler(client);
    client.serverEvents.on("set_time", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_time): void {}
}
