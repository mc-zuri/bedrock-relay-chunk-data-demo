import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class RespawnHandler {
  static register(client: BedrockClientBase) {
    const handler = new RespawnHandler(client);
    client.serverEvents.on("respawn", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_respawn): void {
    this.client.state.entities.entity.position.set(params.position.x, params.position.y, params.position.z);
    this.client.clientEvents.emit("move", this.client.state.entities.entity.position);
  }
}
