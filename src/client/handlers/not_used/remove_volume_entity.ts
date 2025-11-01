import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RemoveVolumeEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new RemoveVolumeEntityHandler(client);
    client.serverEvents.on("remove_volume_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_remove_volume_entity): void {}
}
