import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CameraAimAssistHandler {
  static register(client: BedrockClientBase) {
    const handler = new CameraAimAssistHandler(client);
    client.serverEvents.on("camera_aim_assist", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_camera_aim_assist): void {}
}
