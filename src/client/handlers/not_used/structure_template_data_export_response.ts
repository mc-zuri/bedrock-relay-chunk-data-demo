import type { protocolTypes } from "../../../types/protocol.js";
import type { BedrockClientBase } from "../../bedrock-client-base.ts";

export class StructureTemplateDataExportResponseHandler {
  static register(client: BedrockClientBase) {
    const handler = new StructureTemplateDataExportResponseHandler(client);
    client.serverEvents.on("structure_template_data_export_response", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  handle(params: protocolTypes.packet_structure_template_data_export_response): void {}
}
