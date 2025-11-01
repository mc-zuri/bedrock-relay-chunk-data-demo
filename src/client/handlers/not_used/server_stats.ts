import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerStatsHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerStatsHandler(client);
    client.serverEvents.on("server_stats", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_server_stats): void {}
}
