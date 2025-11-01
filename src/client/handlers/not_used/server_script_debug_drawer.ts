import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ServerScriptDebugDrawerHandler {
  static register(client: BedrockClientBase) {
    const handler = new ServerScriptDebugDrawerHandler(client);
    client.serverEvents.on("server_script_debug_drawer", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_server_script_debug_drawer): void {}
}
