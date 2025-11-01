import { Client, createClient, type ClientOptions } from "bedrock-protocol";
import { BedrockClientBase } from "./bedrock-client-base.ts";

interface BedrockReplayClientOptions {
  clientOptions: ClientOptions;
}

export class BedrockClient extends BedrockClientBase {
  private client: Client;
  constructor(options: BedrockReplayClientOptions) {
    super(options.clientOptions.version!);

    this.client = createClient(options.clientOptions);

    this.client.on("packet", (packet) => {
      this.serverEvents.emit(packet.data.name, packet.data.params);
    });
  }

  queue(name: any, packet: any) {
    this.client.queue(name, packet);
  }
}
