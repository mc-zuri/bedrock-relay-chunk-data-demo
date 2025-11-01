import { PacketDumpReader } from "../utils/packet-dump-reader.ts";
import { BedrockClientBase } from "./bedrock-client-base.ts";
import { fromNotchianPitch, fromNotchianPitchByte, fromNotchianYaw, fromNotchianYawByte } from "./handlers/helpers/convert-helper.ts";

interface BedrockReplayClientOptions {
  reader: PacketDumpReader;
  startDelay?: number;
}

export class BedrockReplayClient extends BedrockClientBase {
  readonly #reader: PacketDumpReader;
  count: number = 0;

  constructor(options: BedrockReplayClientOptions) {
    super(options.reader.version);

    this.#reader = options.reader;
    setTimeout(() => this.simulate(), 50);
  }

  private async simulate() {
    let ret: ReturnType<PacketDumpReader["read"]>;
    let simulationStartTime = process.hrtime.bigint();
    let firstEventTime: bigint | null = null;

    while ((ret = this.#reader.read())) {
      // Capture the first event's timestamp as reference
      if (firstEventTime === null) {
        firstEventTime = ret.time;
      }

      // Calculate how much time should have passed since the first event
      const timeSinceRecordingStart = ret.time - firstEventTime;

      // Calculate how much time has actually passed since simulation start
      const timeSinceSimulationStart = process.hrtime.bigint() - simulationStartTime;

      // Calculate delay needed to match original timing
      const delayNeeded = timeSinceRecordingStart - timeSinceSimulationStart;

      // Wait if we're ahead of schedule
      if (delayNeeded > 0n) {
        // Convert nanoseconds to milliseconds for setTimeout
        const delayMs = Number(delayNeeded / 1_000_000n);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        await new Promise((resolve) => setImmediate(resolve));
      }

      this.count++;
      this.serverEvents.emit(ret.data.data.name, ret.data.data.params);
      if (ret.data.data.name === "player_auth_input") {
        this.state.entities.entity.position.set(ret.data.data.params.position.x, ret.data.data.params.position.y, ret.data.data.params.position.z);
        this.state.entities.entity.yaw = fromNotchianYaw(ret.data.data.params.yaw) ?? 0;
        this.state.entities.entity.pitch = fromNotchianPitch(ret.data.data.params.pitch) ?? 0;
        (this.state as any).entities.entity.headYaw = fromNotchianYaw(ret.data.data.params.yaw) ?? 0;

        this.clientEvents.emit("move", ret.data.data.params.position);
      }
    }
  }
}
