import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fromNotchianPitchByte, fromNotchianYawByte } from "./helpers/convert-helper.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class MoveEntityHandler {
  static register(client: BedrockClientBase) {
    const handler = new MoveEntityHandler(client);
    client.serverEvents.on("move_entity", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_move_entity): void {
    const entity = fetchEntity(packet.runtime_entity_id, this.client);
    entity.position.set(packet.position.x, packet.position.y, packet.position.z);
    entity.headYaw = fromNotchianYawByte(packet.rotation.head_yaw ?? 0);
    this.client.clientEvents.emit("entityMoved", entity);
  }
}
