import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RemoveObjectiveHandler {
  static register(client: BedrockClientBase) {
    const handler = new RemoveObjectiveHandler(client);
    client.serverEvents.on("remove_objective", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_remove_objective): void {}
}
