import type MinecraftData from "minecraft-data";
import type { BedrockClientBase } from "../main.ts";
import type { BedrockEntity, protocolTypes } from "../protocol.js";
import { fetchEntity } from "./helpers/entity-helper.ts";
import { fromNotchianPitchByte, fromNotchianYawByte } from "./helpers/convert-helper.ts";

export class AddItemEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new AddItemEntityHandler(client);
    client.serverEvents.on("add_item_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_add_item_entity): void {
    const entity = fetchEntity(packet.runtime_entity_id, this.client);
    const entityData = this.client.registry.entitiesByName[packet.entity_type?.replace("minecraft:", "")];

    entity.type = entityData ? entityData.type || "object" : "object";

    this.setEntityData(entity, entity.type, entityData);

    if (packet.item) {
      entity.type = "item";
      entity.item = packet.item;
    }

    entity.position.set(packet.position.x, packet.position.y, packet.position.z);
    entity.velocity.set(packet.velocity.x, packet.velocity.y, packet.velocity.z);

    entity.unique_id = packet.entity_id_self;

    // bot.emit('update_attributes', packet)
    this.client.clientEvents.emit("entitySpawn", entity);
  }

  setEntityData(entity: BedrockEntity, type: number, entityData: MinecraftData.Entity | undefined) {
    if (entityData === undefined) {
      entityData = this.client.registry.entitiesArray.find((entity) => entity.internalId === type);
    }
    if (entityData) {
      entity.displayName = entityData.displayName;
      entity.entityType = entityData.id;
      entity.name = entityData.name;
      entity.kind = entityData.category;
      (entity as any).height = entityData.height;
      (entity as any).width = entityData.width;
    } else {
      // unknown entity (item entity?)
      entity.type = "other";
      entity.entityType = type;
      entity.displayName = "unknown";
      entity.name = "unknown";
      entity.kind = "unknown";
    }
  }
}
