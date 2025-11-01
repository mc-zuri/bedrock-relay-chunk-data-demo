import { Vec3 } from "vec3";

import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class SetEntityMotionHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetEntityMotionHandler(client);
    client.serverEvents.on("set_entity_motion", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_set_entity_motion): void {
    const entity = fetchEntity(packet.runtime_entity_id, this.client);
    entity.velocity = new Vec3(packet.velocity.x, packet.velocity.y, packet.velocity.z);
  }
}
