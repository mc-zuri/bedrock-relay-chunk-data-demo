import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ResourcePackDataInfoHandler {
  static register(client: BedrockClientBase) {
    const handler = new ResourcePackDataInfoHandler(client);
    client.serverEvents.on("resource_pack_data_info", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_resource_pack_data_info): void {}
}
