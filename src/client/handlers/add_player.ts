import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fromNotchianPitchByte, fromNotchianYawByte } from "./helpers/convert-helper.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

const NAMED_ENTITY_HEIGHT = 1.62;
const NAMED_ENTITY_WIDTH = 0.6;
const CROUCH_HEIGHT = NAMED_ENTITY_HEIGHT - 0.08;

export class AddPlayerHandler {
  static register(client: BedrockClientBase) {
    const handler = new AddPlayerHandler(client);
    client.serverEvents.on("add_player", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_add_player): void {
    const bot = this.client.state.entities;
    const runtime_id = packet.runtime_id;
    const entity = fetchEntity(runtime_id, this.client);
    entity.type = "player";
    entity.name = "player";
    entity.id = runtime_id;
    entity.username = bot.uuidToUsername[packet.uuid];
    entity.uuid = packet.uuid;
    entity.unique_id = packet.unique_id;
    entity.position.set(packet.position.x, packet.position.y - NAMED_ENTITY_HEIGHT, packet.position.z);

    entity.yaw = fromNotchianYawByte(packet.yaw);
    entity.pitch = fromNotchianPitchByte(packet.pitch);
    entity.headYaw = fromNotchianYawByte(packet.head_yaw ?? 0);

    entity.height = NAMED_ENTITY_HEIGHT;
    entity.width = NAMED_ENTITY_WIDTH;
    entity.metadata = this.parseMetadata(packet.metadata, entity.metadata);
    if (bot.players[entity.username] !== undefined && !bot.players[entity.username].entity) {
      bot.players[entity.username].entity = entity;
    }
    this.client.clientEvents.emit("entitySpawn", entity);
  }

  parseMetadata(metadata: protocolTypes.MetadataDictionary, entityMetadata: Record<string, any>) {
    if (metadata !== undefined) {
      for (const { key, value } of metadata) {
        entityMetadata[key] = value;
      }
    }

    return entityMetadata;
  }
}
