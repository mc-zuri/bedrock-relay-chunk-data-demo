import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class SetEntityLinkHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetEntityLinkHandler(client);
    client.serverEvents.on("set_entity_link", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_set_entity_link): void {
    const entity = fetchEntity(packet.link.rider_entity_id, this.client);
    if (packet.link.type === 0) {
      const vehicle = entity.vehicle;
      delete entity.vehicle;
      this.client.clientEvents.emit("entityDetach", entity, vehicle);
    } else {
      entity.vehicle = fetchEntity(packet.link.ridden_entity_id, this.client);
      this.client.clientEvents.emit("entityAttach", entity, entity.vehicle);
    }
  }
}
