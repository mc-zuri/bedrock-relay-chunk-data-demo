import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class RemoveEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new RemoveEntityHandler(client);
    client.serverEvents.on("remove_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_remove_entity): void {
    const bot = this.client.state.entities;
    const id = packet.entity_id_self;
    const entity = fetchEntity(id, this.client);
    if (!entity) return;
    this.client.clientEvents.emit("entityGone", entity);
    entity.isValid = false;
    if (entity.username && bot.players[entity.username]) {
      bot.players[entity.username].entity = undefined;
    }
    delete bot.entities[id];
  }
}
