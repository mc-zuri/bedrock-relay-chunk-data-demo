import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class MapInfoRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new MapInfoRequestHandler(client);
    client.serverEvents.on("map_info_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_map_info_request): void {}
}
