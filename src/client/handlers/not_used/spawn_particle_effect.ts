import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SpawnParticleEffectHandler {
  static register(client: BedrockClientBase) {
    const handler = new SpawnParticleEffectHandler(client);
    client.serverEvents.on("spawn_particle_effect", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_spawn_particle_effect): void {}
}
