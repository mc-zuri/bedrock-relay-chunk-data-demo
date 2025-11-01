import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class ModalFormResponseHandler {
  static register(client: BedrockClientBase) {
    const handler = new ModalFormResponseHandler(client);
    client.serverEvents.on("modal_form_response", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_modal_form_response): void {}
}
