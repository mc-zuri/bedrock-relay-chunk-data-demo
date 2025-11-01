import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ModalFormRequestHandler {
  static register(client: BedrockClientBase) {
    const handler = new ModalFormRequestHandler(client);
    client.serverEvents.on("modal_form_request", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_modal_form_request): void {}
}
