import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class TickingAreasLoadStatusHandler {
  static register(client: BedrockClientBase) {
    const handler = new TickingAreasLoadStatusHandler(client);
    client.serverEvents.on("ticking_areas_load_status", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_ticking_areas_load_status): void {}
}
