import type { BedrockClientBase } from "../bedrock-client-base.ts";
import type { protocolTypes } from "../../types/protocol.js";
import { fetchEntity } from "./helpers/entity-helper.ts";
import { fromNotchianPitch, fromNotchianYaw } from "./helpers/convert-helper.ts";

export class StartGameHandler {
  static register(client: BedrockClientBase) {
    const handler = new StartGameHandler(client);
    client.serverEvents.on("start_game", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(packet: protocolTypes.packet_start_game): void {
    this.client.registry.handleStartGame({ itemstates: [], ...packet });
    this.client.state.entities.entity = fetchEntity(packet.runtime_entity_id, this.client);
    this.client.state.entities.entity.position.set(packet.player_position.x, packet.player_position.y, packet.player_position.z);
    this.client.state.entities.entity.yaw = fromNotchianYaw(packet.rotation.x) ?? 0;
    this.client.state.entities.entity.pitch = fromNotchianPitch(packet.rotation.z) ?? 0;
    (this.client.state as any).entities.entity.headYaw = fromNotchianYaw(packet.rotation.x) ?? 0;

    this.client.state.entities.username = "Bot"; // TODO: this.client.state.entities._client.username
    this.client.state.entities.entity.username = this.client.state.entities.username;
    this.client.state.entities.entity.type = "player";
    this.client.state.entities.entity.name = "player";

    this.client.queue("serverbound_loading_screen", { type: 1 });
    this.client.queue("serverbound_loading_screen", { type: 2 });
    this.client.queue("interact", {
      action_id: "mouse_over_entity",
      target_entity_id: 0n,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
    this.client.queue("set_local_player_as_initialized", {
      runtime_entity_id: `${packet.runtime_entity_id}`,
    });
  }
}
