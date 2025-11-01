import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class GuiDataPickItemHandler {
  static register(client: BedrockClientBase) {
    const handler = new GuiDataPickItemHandler(client);
    client.serverEvents.on("gui_data_pick_item", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_gui_data_pick_item): void {}
}
