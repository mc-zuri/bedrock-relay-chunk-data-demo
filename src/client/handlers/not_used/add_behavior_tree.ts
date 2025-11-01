import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AddBehaviorTreeHandler {
  static register(client: BedrockClientBase) {
    const handler = new AddBehaviorTreeHandler(client);
    client.serverEvents.on("add_behavior_tree", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_add_behavior_tree): void {}
}
