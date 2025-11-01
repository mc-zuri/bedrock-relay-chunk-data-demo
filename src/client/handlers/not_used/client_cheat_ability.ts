import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientCheatAbilityHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientCheatAbilityHandler(client);
    client.serverEvents.on("client_cheat_ability", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_client_cheat_ability): void {}
}
