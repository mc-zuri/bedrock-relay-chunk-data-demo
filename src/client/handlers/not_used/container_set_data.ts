import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ContainerSetDataHandler {
  static register(client: BedrockClientBase) {
    const handler = new ContainerSetDataHandler(client);
    client.serverEvents.on("container_set_data", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_container_set_data): void {}
}
