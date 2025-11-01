import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class LecternUpdateHandler {
  static register(client: BedrockClientBase) {
    const handler = new LecternUpdateHandler(client);
    client.serverEvents.on("lectern_update", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_lectern_update): void {}
}
