import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AddVolumeEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new AddVolumeEntityHandler(client);
    client.serverEvents.on("add_volume_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_add_volume_entity): void {}
}
