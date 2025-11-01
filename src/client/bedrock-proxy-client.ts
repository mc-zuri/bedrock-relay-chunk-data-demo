import { Relay, type RelayOptions, type Version } from "bedrock-protocol";
import { BedrockClientBase } from "./bedrock-client-base.ts";
import { PackentDumpWriter } from "../utils/packet-dump-writter.ts";
import { fromNotchianPitch, fromNotchianYaw } from "./handlers/helpers/convert-helper.ts";

interface BedrockProxyClientOptions {
  saveDump?: boolean;
  relayOptions: RelayOptions;
}
export class BedrockProxyClient extends BedrockClientBase {
  constructor(options: BedrockProxyClientOptions) {
    super(options.relayOptions.version!);

    const relay = new Relay(options.relayOptions);

    const writter = options.saveDump ? new PackentDumpWriter(options.relayOptions.version!) : null;
    relay.on("connect", (player) => {
      player.on("clientbound", async (packet: any, des: any) => {
        writter?.writeClientbound(des.fullBuffer);
        this.serverEvents.emit(des.data.name, des.data.params);
      });
      player.on("serverbound", async (packet: any, des: any) => {
        writter?.writeServerbound(des.fullBuffer);
        this.serverEvents.emit(des.data.name, des.data.params);

        if (des.data.name === "player_auth_input") {
          this.state.entities.entity.position.set(des.data.params.position.x, des.data.params.position.y, des.data.params.position.z);
          this.state.entities.entity.yaw = fromNotchianYaw(des.data.params.yaw) ?? 0;
          this.state.entities.entity.pitch = fromNotchianPitch(des.data.params.pitch) ?? 0;
          (this.state as any).entities.entity.headYaw = fromNotchianYaw(des.data.params.yaw) ?? 0;

          this.clientEvents.emit("move", des.data.params.position);
        }
      });

      player.on("error", (err) => {
        console.error("Relay error:", err);
      });
    });

    relay.on("error", (err) => {
      console.error("Relay error:", err);
    });

    relay.listen();
  }
}
