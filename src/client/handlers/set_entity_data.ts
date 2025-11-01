import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class SetEntityDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new SetEntityDataHandler(client);
    client.serverEvents.on("set_entity_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_set_entity_data): void {
    const entity = fetchEntity(packet.runtime_entity_id, this.client);
    entity.metadata = this.parseMetadata(packet.metadata, entity.metadata);
    this.client.clientEvents.emit("entityUpdate", entity);
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
