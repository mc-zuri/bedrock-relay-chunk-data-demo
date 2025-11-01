import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class SpawnExperienceOrbHandler {
  static register(client: BedrockClientBase) {
    const handler = new SpawnExperienceOrbHandler(client);
    client.serverEvents.on("spawn_experience_orb", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_spawn_experience_orb): void {}
}
