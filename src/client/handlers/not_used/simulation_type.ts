import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SimulationTypeHandler {
  static register(client: BedrockClientBase) {
    const handler = new SimulationTypeHandler(client);
    client.serverEvents.on("simulation_type", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_simulation_type): void {}
}
