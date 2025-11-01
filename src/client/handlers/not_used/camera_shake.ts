import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class CameraShakeHandler {
  static register(client: BedrockClientBase) {
    const handler = new CameraShakeHandler(client);
    client.serverEvents.on("camera_shake", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_camera_shake): void {}
}
