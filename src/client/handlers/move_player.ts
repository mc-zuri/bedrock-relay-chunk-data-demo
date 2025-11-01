import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fromNotchianPitchByte, fromNotchianYawByte } from "./helpers/convert-helper.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

const NAMED_ENTITY_HEIGHT = 1.62;
const NAMED_ENTITY_WIDTH = 0.6;

export class MovePlayerHandler {
  static register(client: BedrockClientBase) {
    const handler = new MovePlayerHandler(client);
    client.serverEvents.on("move_player", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_move_player): void {
    const entity = fetchEntity(packet.runtime_id, this.client);
    const position = packet.position;
    entity.position.set(position.x, position.y - NAMED_ENTITY_HEIGHT, position.z);

    entity.yaw = fromNotchianYawByte(packet.yaw);
    entity.pitch = fromNotchianPitchByte(packet.pitch);
    entity.headYaw = fromNotchianYawByte(packet.head_yaw ?? 0);

    this.client.clientEvents.emit("playerMoved", entity);
    this.client.clientEvents.emit("entityMoved", entity);
  }
}
