import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AgentActionHandler {
  static register(client: BedrockClientBase) {
    const handler = new AgentActionHandler(client);
    client.serverEvents.on("agent_action", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_agent_action): void {}
}
