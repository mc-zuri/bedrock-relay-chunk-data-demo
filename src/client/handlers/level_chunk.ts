import { BlobEntry } from "prismarine-chunk";

import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import assert from "assert";

export class LevelChunkHandler {
  static register(client: BedrockClientBase) {
    const handler = new LevelChunkHandler(client);
    client.serverEvents.on("level_chunk", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  async handle(packet: protocolTypes.packet_level_chunk) {
    const world = this.client.state.world.world;
    const blobStore = this.client.state.world.blobStore;
    const cachingEnabled = this.client.state.world.cachingEnabled;

    const cc = new this.client.ChunkColumn({ x: packet.x, z: packet.z });
    if (!cachingEnabled) {
      await cc.networkDecodeNoCache(packet.payload, packet.sub_chunk_count);
    } else if (cachingEnabled) {
      const misses = await cc.networkDecode(packet.blobs.hashes, blobStore, packet.payload);
      if (!packet.blobs.hashes.length) return;

      this.client?.queue("client_cache_blob_status", {
        misses: misses.length,
        haves: 0,
        have: [],
        missing: misses,
      });

      if (packet.sub_chunk_count < 0) {
        // 1.18+
        for (const miss of misses) blobStore.addPending(miss, new BlobEntry({ type: 1 /*BlobType.Biomes*/, x: packet.x, z: packet.z }));
      } else {
        // 1.17-
        const lastBlob = packet.blobs.hashes[packet.blobs.hashes.length - 1];
        for (const miss of misses) {
          blobStore.addPending(
            miss,
            new BlobEntry({
              type: miss === lastBlob ? 1 /*BlobType.Biomes*/ : 0 /*BlobType.ChunkSection*/,
              x: packet.x,
              z: packet.z,
            })
          );
        }
      }

      blobStore.once(misses, async () => {
        const now = await cc.networkDecode(packet.blobs.hashes, blobStore, packet.payload);

        assert.strictEqual(now.length, 0);

        this.client?.queue("client_cache_blob_status", {
          misses: 0,
          haves: packet.blobs.hashes.length,
          have: packet.blobs.hashes,
          missing: [],
        });
      });
    }

    if (packet.sub_chunk_count < 0) {
      const maxSubChunkCount = packet.highest_subchunk_count || 5; // field is set if sub_chunk_count=-2 (1.18.10+)

      if (this.client.registry.version[">="]("1.18.11")) {
        const requests = [];
        for (let i = 0; i <= maxSubChunkCount; i++) {
          requests.push({ dx: 0, dz: 0, dy: cc.minCY + i });
        }
        this.client?.queue("subchunk_request", { origin: { x: packet.x, z: packet.z, y: 0 }, requests, dimension: 0 });
      } else if (this.client.registry.version[">="]("1.18")) {
        for (let i = cc.minCY; i < maxSubChunkCount; i++) {
          this.client?.queue("subchunk_request", { x: packet.x, z: packet.z, y: i, dimension: 0 });
        }
      }
    }

    await world.setColumn(packet.x, packet.z, cc);
  }
}
