import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class EducationSettingsHandler {
  static register(client: BedrockClientBase) {
    const handler = new EducationSettingsHandler(client);
    client.serverEvents.on("education_settings", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_education_settings): void {}
}
