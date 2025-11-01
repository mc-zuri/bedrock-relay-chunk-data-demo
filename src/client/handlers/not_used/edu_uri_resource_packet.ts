import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class EduUriResourcePacketHandler {
  static register(client: BedrockClientBase) {
    const handler = new EduUriResourcePacketHandler(client);
    client.serverEvents.on("edu_uri_resource_packet", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_edu_uri_resource_packet): void {}
}
