import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";

export class EntityEventHandler {
  static register(client: BedrockClientBase) {
    const handler = new EntityEventHandler(client);
    client.serverEvents.on("entity_event", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_entity_event): void {
    if (packet.runtime_entity_id !== this.client.state.entities.entity.id) return;

    if (packet.event_id === "respawn") {
      this.client.clientEvents.emit("entitySpawn", this.client.state.entities.entity);
    }
  }
}
