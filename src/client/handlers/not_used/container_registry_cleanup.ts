import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ContainerRegistryCleanupHandler {
  static register(client: BedrockClientBase) {
    const handler = new ContainerRegistryCleanupHandler(client);
    client.serverEvents.on("container_registry_cleanup", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_container_registry_cleanup): void {}
}
