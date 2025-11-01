import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class PositionTrackingDbRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new PositionTrackingDbRequestHandler(client);
    client.serverEvents.on("position_tracking_db_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_position_tracking_db_request): void {}
}
