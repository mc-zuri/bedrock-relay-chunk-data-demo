import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ClientMovementPredictionSyncHandler {
  static register(client: BedrockClientBase) {
    const handler = new ClientMovementPredictionSyncHandler(client);
    client.serverEvents.on("client_movement_prediction_sync", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_client_movement_prediction_sync): void {}
}
