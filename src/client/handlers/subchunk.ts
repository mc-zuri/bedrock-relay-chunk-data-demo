import { BlobEntry, type BedrockChunk } from "prismarine-chunk";

import type { protocolTypes } from "../../types/protocol.js";
import type { BedrockClientBase } from "../bedrock-client-base.ts";
import { Vec3 } from "vec3";
import assert from "assert";

export class SubchunkHandler {
  static register(client: BedrockClientBase) {
    const handler = new SubchunkHandler(client);
    client.serverEvents.on("subchunk", (packet) => handler.handle(packet));
  }

  private client: BedrockClientBase;
  private constructor(client: BedrockClientBase) {
    this.client = client;
  }

  async handle(packet: protocolTypes.packet_subchunk) {
    const world = this.client.state.world.world;
    const blobStore = this.client.state.world.blobStore;
    const cachingEnabled = this.client.state.world.cachingEnabled;

    if (packet.entries) {
      // 1.18.10+ handling
      for (const entry of packet.entries) {
        const x = packet.origin.x + entry.dx;
        const y = packet.origin.y + entry.dy;
        const z = packet.origin.z + entry.dz;
        const cc = world.getColumn(x, z) as BedrockChunk;
        if (entry.result === "success") {
          if (packet.cache_enabled) {
            await this.loadCached(cc, x, y, z, entry.blob_id, entry.payload);
          } else {
            await cc.networkDecodeSubChunkNoCache(y, entry.payload);
            world.emit("chunkColumnLoad", new Vec3(x, y, z));
          }
        }
      }
    }
    // else {
    //     if (packet.request_result !== "success") {
    //         return;
    //     }
    //     const cc = world.getColumn(packet.x, packet.z) as BedrockChunk;
    //     if (packet.cache_enabled) {
    //         await this.loadCached(
    //             cc,
    //             packet.x,
    //             packet.y,
    //             packet.z,
    //             packet.blob_id,
    //             packet.data
    //         );
    //     } else {
    //         await cc.networkDecodeSubChunkNoCache(packet.y, packet.data);
    //         this.world.emit('chunkColumnLoad', new Vec3(packet.x, packet.y, packet.z));
    //     }
    // }
  }

  async loadCached(cc: any, x: any, y: any, z: any, blobId: any, extraData: any) {
    const world = this.client.state.world.world;
    const blobStore = this.client.state.world.blobStore;
    const cachingEnabled = this.client.state.world.cachingEnabled;

    const misses = await cc.networkDecodeSubChunk([blobId], blobStore, extraData);
    this.client.state.world.subChunkMissHashes.push(...misses);

    for (const miss of misses) {
      blobStore.addPending(miss, new BlobEntry({ type: 0 /*BlobType.ChunkSection*/, x, z, y }));
    }

    if (this.client.state.world.subChunkMissHashes.length >= 10) {
      const r = {
        misses: this.client.state.world.subChunkMissHashes.length,
        haves: 0,
        have: [],
        missing: this.client.state.world.subChunkMissHashes,
      };
      this.client?.queue("client_cache_blob_status", r);
      this.client.state.world.subChunkMissHashes = [];
    }

    if (misses.length) {
      const [missed] = misses;

      blobStore.once([missed], async () => {
        const misses = await cc.networkDecodeSubChunk([missed], blobStore);
        assert(!misses.length, "Should not have missed anything");

        const [hash] = await cc.networkEncodeSubChunk(y, blobStore);
        assert(hash.toString() === missed.toString(), "Should not have missed anything");
      });
    }
  }
}
