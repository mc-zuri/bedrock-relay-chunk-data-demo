import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AgentAnimationHandler {
  static register(client: BedrockClientBase) {
    const handler = new AgentAnimationHandler(client);
    client.serverEvents.on("agent_animation", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_agent_animation): void {}
}
