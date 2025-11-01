import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerboundPackSettingChangeHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerboundPackSettingChangeHandler(client);
    client.serverEvents.on("serverbound_pack_setting_change", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_serverbound_pack_setting_change): void {}
}
