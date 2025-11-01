import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MotionPredictionHintsHandler {
  static register(client: BedrockClientBase) {
    const handler = new MotionPredictionHintsHandler(client);
    client.serverEvents.on("motion_prediction_hints", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_motion_prediction_hints): void {}
}
