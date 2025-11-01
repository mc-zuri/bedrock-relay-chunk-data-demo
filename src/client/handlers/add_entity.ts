import type MinecraftData from "minecraft-data";
import type { BedrockClientBase } from "../main.ts";
import type { BedrockEntity, protocolTypes } from "../protocol.js";
import { fetchEntity } from "./helpers/entity-helper.ts";
import { fromNotchianPitchByte, fromNotchianYawByte } from "./helpers/convert-helper.ts";

export class AddEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new AddEntityHandler(client);
    client.serverEvents.on("add_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_add_entity): void {
    const entity = fetchEntity(packet.runtime_id, this.client);
    const entityData = this.client.registry.entitiesByName[packet.entity_type?.replace("minecraft:", "")];

    entity.type = entityData ? entityData.type || "object" : "object";

    this.setEntityData(entity, entity.type, entityData);

    entity.position.set(packet.position.x, packet.position.y, packet.position.z);
    entity.velocity.set(packet.velocity.x, packet.velocity.y, packet.velocity.z);

    entity.unique_id = packet.unique_id;
    if (entity.type !== "item") {
      entity.yaw = fromNotchianYawByte(packet.yaw) ?? 0;
      entity.pitch = fromNotchianPitchByte(packet.pitch) ?? 0;
      entity.headYaw = fromNotchianPitchByte(packet.head_yaw) ?? 0;
    }

    if (packet.links) {
      for (const link of packet.links) {
        const rider = fetchEntity(link.rider_entity_id, this.client);
        rider.vehicle = fetchEntity(link.ridden_entity_id, this.client);
        this.client.clientEvents.emit("entityAttach", rider, rider.vehicle);
      }
    }
    // this.client.clientEvents.emit('update_attributes', packet)
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
