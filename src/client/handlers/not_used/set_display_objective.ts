import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SetDisplayObjectiveHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetDisplayObjectiveHandler(client);
    client.serverEvents.on("set_display_objective", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_set_display_objective): void {}
}
