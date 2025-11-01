import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class UpdateAttributesHandler {
  static register(client: BedrockClientBase) {
    const handler = new UpdateAttributesHandler(client);
    client.serverEvents.on("update_attributes", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_update_attributes): void {
    const entity = fetchEntity(packet.runtime_entity_id, this.client);

    for (const prop of packet.attributes) {
      entity.attributes[prop.name] = {
        value: prop.current,
        modifiers: prop.modifiers.map((x) => ({ ...x, uuid: x.id })),
        // extra info, bedrock only
        min: prop.min,
        max: prop.max,
        default: prop.default,
      };

      if (prop.name === "minecraft:movement") {
        entity.attributes[prop.name].value = entity.attributes[prop.name].default;
      }
    }

    this.client.clientEvents.emit("entityAttributes", entity);
  }
}
