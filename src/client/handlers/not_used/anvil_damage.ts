import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class AnvilDamageHandler {
  static register(client: BedrockClientBase) {
    const handler = new AnvilDamageHandler(client);
    client.serverEvents.on("anvil_damage", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_anvil_damage): void {}
}
