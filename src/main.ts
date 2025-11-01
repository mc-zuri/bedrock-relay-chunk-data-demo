import { BedrockClient } from "./client/bedrock-client.ts";
import { BedrockProxyClient } from "./client/bedrock-proxy-client.ts";
import { BedrockReplayClient } from "./client/bedrock-replay-client.ts";
import { PacketDumpReader } from "./utils/packet-dump-reader.ts";
import { setupWebView } from "./web-view/view.ts";

// const client = new BedrockProxyClient({
//   saveDump: true,
//   relayOptions: {
//     version: "1.21.111",
//     host: "0.0.0.0",
//     port: 19150,
//     enableChunkCaching: false,
//     offline: false,
//     destination: {
//       host: "play.cubecraft.net",
//       port: 19132,
//     },
//     profilesFolder: "C:/git/profiles",
//     omitParseErrors: true,
//   },
// });

// const client = new BedrockReplayClient({
//   reader: new PacketDumpReader("dumps/1.21.111-1762026466343.bin"),
//   startDelay: 500,
// });

// const client = new BedrockClient({
//   clientOptions: {
//     version: "1.21.111",
//     host: "127.0.0.1",
//     port: 19132,
//     offline: false,
//     profilesFolder: "C:/git/profiles",
//     username: "...",
//   },
// });

client.serverEvents.on("start_game", () => {
  setTimeout(() => {
    setupWebView(client, { firstPerson: false, port: 3000, prefix: "", viewDistance: 6 });
  }, 5000);
});
