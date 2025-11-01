import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerPostMoveHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerPostMoveHandler(client);
    client.serverEvents.on("server_post_move", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_server_post_move): void {}
}
