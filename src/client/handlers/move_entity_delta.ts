import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fromNotchianPitchByte, fromNotchianYawByte } from "./helpers/convert-helper.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class MoveEntityDeltaHandler {
  static register(client: BedrockClientBase) {
    const handler = new MoveEntityDeltaHandler(client);
    client.serverEvents.on("move_entity_delta", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_move_entity_delta): void {
    // entity teleport
    const entity = fetchEntity(packet.runtime_entity_id, this.client);
    entity.position.set(packet.x ?? entity.position.x, packet.y ?? entity.position.y, packet.z ?? entity.position.z);
    entity.yaw = fromNotchianYawByte(packet.rot_z ?? entity.yaw);
    entity.pitch = fromNotchianPitchByte(packet.rot_y ?? entity.pitch);
    entity.headYaw = fromNotchianYawByte(packet.rot_x ?? entity.headYaw);

    this.client.clientEvents.emit("entityMoved", entity);
  }
}
