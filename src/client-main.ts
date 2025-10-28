import { Client, createClient, Relay, type Version } from "bedrock-protocol";
import PrismarineRegistry, { type RegistryBedrock } from 'prismarine-registry';
import { NetworkWorldProvider } from "./providers/network-world-provider.ts";
import { Vec3 } from "vec3";
import type { BedrockChunk } from "prismarine-chunk";
import type { Block, IndexedBlock } from "minecraft-data";

interface SubChunk118 {
    palette: Array<IndexedBlock[]>
}

async function main() {
    const version: Version = "1.21.111";
    const registry = PrismarineRegistry(`bedrock_${version}`) as RegistryBedrock;
    const enableChunkCaching = false;

    const client = createClient({
        version,
        host: "127.0.0.1",
        port: 19132,
        offline: false,
        username: '',
        profilesFolder: 'C:/git/profiles'
    });


    const networkWorldProvider = NetworkWorldProvider.fromClient(client, registry);
    const world = networkWorldProvider.world;
    const blockStates = new Set<number>();

    await waitUntilLoaded(client);
    for (const [key, value] of Object.entries(registry.blocksByRuntimeId)) {
        if (value.name.includes('chest')) {
            blockStates.add(parseInt(key));
        }
    }

    for (let chunkX = -10; chunkX <= 10; chunkX++) {
        for (let chunkZ = -10; chunkZ <= 10; chunkZ++) {
            const chunk = world.getColumn(chunkX, chunkZ) as any as (BedrockChunk & { sections: SubChunk118[] });
            if (chunk?.sections.length) {
                for (const section of chunk.sections) {
                    if (section.palette[0].some(x => blockStates.has(x.stateId))) {

                        for (let x = 0; x < 16; x++) {
                            for (let z = 0; z < 16; z++) {
                                for (let y = -64; y < 300; y++) {
                                    const stateId = chunk.getBlockStateId({ x, y, z });
                                    if (blockStates.has(stateId)) {
                                        const name = registry.blocksByRuntimeId[stateId]?.name;

                                        console.log(`${name} at (${chunkX * 16 + x}, ${y}, ${chunkZ * 16 + z})`);
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }
    }

    client.close();
}


main();



function waitUntilLoaded(client: Client): Promise<void> {
    return new Promise<void>((resolve) => {
        let timeoutId: NodeJS.Timeout

        client.on('level_chunk', () => resetTimeout());
        client.on('subchunk', () => resetTimeout());
        client.on('client_cache_miss_response', () => resetTimeout());
        client.on('join', () => resetTimeout());
        client.on('start_game', () => resetTimeout());


        function resetTimeout() {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                resolve()
            }, 5000)
        }
    });

}