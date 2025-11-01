import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ResourcePacksInfoHandler {
  static register(client: BedrockClientBase) {
    const handler = new ResourcePacksInfoHandler(client);
    client.serverEvents.on("resource_packs_info", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_resource_packs_info): void {}
}
