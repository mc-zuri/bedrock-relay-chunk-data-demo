import { Relay, type Version } from "bedrock-protocol";
import PrismarineRegistry, { type RegistryBedrock } from 'prismarine-registry';
import { NetworkWorldProvider } from "./providers/network-world-provider.ts";
import { Vec3 } from "vec3";
import { SubChunk } from "prismarine-chunk";

function main() {
    const version: Version = "1.21.111";
    const registry = PrismarineRegistry(`bedrock_${version}`) as RegistryBedrock && {sections: SubChunk[]};
    const enableChunkCaching = false;

    const relay = new Relay({
        version,
        host: "0.0.0.0",
        port: 19150,
        enableChunkCaching,
        offline: false,
        destination: {
            host: "localhost",
            port: 19132
        },
        profilesFolder: 'C:/git/profiles'
    });

    relay.on('connect', (player) => {
        const networkWorldProvider = NetworkWorldProvider.fromRelayPlayer(player, registry);
        const world = networkWorldProvider.world;

        let lastBlockStateId: number | undefined = undefined;
        player.on('serverbound', async (packet: any, des: any) => {
            if (des.data.name === "player_auth_input") {
                const currentBlockStateId = world.getBlockStateId(new Vec3(des.data.params.position.x, des.data.params.position.y, des.data.params.position.z).offset(0, -2, 0));
                if(currentBlockStateId !=   lastBlockStateId) {
                    lastBlockStateId = currentBlockStateId;
                    const name = registry.blocksByRuntimeId[currentBlockStateId]?.name;
                    console.log(`Player is standing on block with state ID: ${currentBlockStateId}`, name);
                }
            }
        });
    });

    relay.listen();
}


main();