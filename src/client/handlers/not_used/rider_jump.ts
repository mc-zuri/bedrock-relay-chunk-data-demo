import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RiderJumpHandler {
  static register(client: BedrockClientBase) {
    const handler = new RiderJumpHandler(client);
    client.serverEvents.on("rider_jump", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_rider_jump): void {}
}
