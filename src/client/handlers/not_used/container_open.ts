import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ContainerOpenHandler {
  static register(client: BedrockClientBase) {
    const handler = new ContainerOpenHandler(client);
    client.serverEvents.on("container_open", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_container_open): void {}
}
