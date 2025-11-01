import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ChangeMobPropertyHandler {
  static register(client: BedrockClientBase) {
    const handler = new ChangeMobPropertyHandler(client);
    client.serverEvents.on("change_mob_property", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_change_mob_property): void {}
}
