import { type Player, Relay } from "bedrock-protocol";
import PrismarineChunk, { type BedrockChunk, BlobEntry, type BlobType } from "prismarine-chunk";
import PrismarineWorld, { type world } from "prismarine-world";
import PrismarineRegistry, { type RegistryBedrock } from 'prismarine-registry';
import { Vec3 } from "vec3";
import { BlobStore } from "./blob-store.ts";

export class NetworkWorldProvider {
    static fromRelayPlayer(player: Player, prismarineRegistry: RegistryBedrock) {
        return new NetworkWorldProvider(player, prismarineRegistry);
    }

    subChunkMissHashes: any[] = [];
    cachingEnabled = false;
    position = new Vec3(0, 0, 0);
    blobStore = new BlobStore();
    world: world.WorldSync;
    ChunkColumn!: typeof BedrockChunk;
    private player: Player;
    private registry: RegistryBedrock;

    private constructor(player: Player, prismarineRegistry: RegistryBedrock) {
        this.world = (new ((PrismarineWorld as any)(''))).sync as world.WorldSync;
        this.player = player;
        this.registry = prismarineRegistry;
        this.ChunkColumn = (PrismarineChunk as any)(
            this.registry as any
        ) as typeof BedrockChunk;

        this.setupEvents();
    }

    private setupEvents() {
        this.player.on('clientbound', async (_: any, des: any) => {
            switch (des.data.name) {
                case "start_game":
                    this.registry.handleStartGame({ ...des.data.params, itemstates: [] });
                    break;
                case "item_registry":
                    this.registry.handleItemRegistry(des.data.params)
                    break;

                case "client_cache_miss_response":
                    this.on_client_cache_miss_response(des.data.params);
                    break;

                case "level_chunk":
                    this.on_level_chunk(des.data.params);
                    break;

                case "subchunk":
                    this.on_subchunk(des.data.params);
                    break;

                case "update_block":
                    this.on_update_block(des.data.params);
                    break;
            }
        });

        this.player.on('serverbound', (_: any, des: any) => {
            if (des.data.name === "player_auth_input") {
                this.position.set(des.data.params.position.x, des.data.params.position.y, des.data.params.position.z);
            }
        });
    }

    async on_client_cache_miss_response(packet: any) {
        const acks: any = [];
        for (const { hash, payload } of packet.blobs) {
            const name = hash.toString();
            this.blobStore.updatePending(name, { buffer: payload });
            acks.push(hash);
        }
    }


    async on_level_chunk(packet: any) {
        const cc = new this.ChunkColumn({ x: packet.x, z: packet.z });
        if (!this.cachingEnabled) {
            await cc.networkDecodeNoCache(packet.payload, packet.sub_chunk_count);
        } else if (this.cachingEnabled) {
            const misses = await cc.networkDecode(
                packet.blobs.hashes,
                this.blobStore,
                packet.payload
            );
            if (!packet.blobs.hashes.length)
                return;

            if (packet.sub_chunk_count < 0) {
                // 1.18+
                for (const miss of misses)
                    this.blobStore.addPending(
                        miss,
                        new BlobEntry({ type: 1 /*BlobType.Biomes*/, x: packet.x, z: packet.z })
                    );
            } else {
                // 1.17-
                const lastBlob = packet.blobs.hashes[packet.blobs.hashes.length - 1];
                for (const miss of misses) {
                    this.blobStore.addPending(
                        miss,
                        new BlobEntry({
                            type: miss === lastBlob ? 1 /*BlobType.Biomes*/ : 0/*BlobType.ChunkSection*/,
                            x: packet.x,
                            z: packet.z,
                        })
                    );
                }
            }

            this.blobStore.once(misses, async () => {
                const now = await cc.networkDecode(
                    packet.blobs.hashes,
                    this.blobStore,
                    packet.payload
                );
            });
        }

        await this.world.setColumn(packet.x, packet.z, cc);
    }

    async on_subchunk(packet: any) {
        if (packet.entries) {
            // 1.18.10+ handling
            for (const entry of packet.entries) {
                const x = packet.origin.x + entry.dx;
                const y = packet.origin.y + entry.dy;
                const z = packet.origin.z + entry.dz;
                const cc = this.world.getColumn(x, z) as BedrockChunk;
                if (entry.result === "success") {
                    if (packet.cache_enabled) {
                        await this.loadCached(cc, x, y, z, entry.blob_id, entry.payload);
                    } else {
                        await cc.networkDecodeSubChunkNoCache(y, entry.payload);
                    }
                }
            }
        } else {
            if (packet.request_result !== "success") {
                return;
            }
            const cc = this.world.getColumn(packet.x, packet.z) as BedrockChunk;
            if (packet.cache_enabled) {
                await this.loadCached(
                    cc,
                    packet.x,
                    packet.y,
                    packet.z,
                    packet.blob_id,
                    packet.data
                );
            } else {
                await cc.networkDecodeSubChunkNoCache(packet.y, packet.data);
            }
        }
    }

    async loadCached(
        cc: any,
        x: any,
        y: any,
        z: any,
        blobId: any,
        extraData: any
    ) {
        const misses = await cc.networkDecodeSubChunk(
            [blobId],
            this.blobStore,
            extraData
        );
        this.subChunkMissHashes.push(...misses);

        for (const miss of misses) {
            this.blobStore.addPending(
                miss,
                new BlobEntry({ type: 0 /*BlobType.ChunkSection*/, x, z, y })
            );
        }

        if (this.subChunkMissHashes.length >= 10) {
            const r = {
                misses: this.subChunkMissHashes.length,
                haves: 0,
                have: [],
                missing: this.subChunkMissHashes,
            };
            this.subChunkMissHashes = [];
        }

        if (misses.length) {
            const [missed] = misses;

            this.blobStore.once([missed], async () => {
                const misses = await cc.networkDecodeSubChunk([missed], this.blobStore);
            });
        }
    }

    async on_update_block(packet: any) {
        const chunk = this.world.getColumnAt(packet.position);
        const newBlock = this.registry.blocksByStateId[packet.block_runtime_id];
        if (chunk) {
            chunk.setBlock(packet.position, {
                ...(newBlock as any),
                stateId: packet.block_runtime_id,
            });
        }
    }
}

