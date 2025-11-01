import type { BlobStore } from "../client/blob-store.ts";
import type { BedrockEntity } from "./bedrock-entity.ts";
import type { PlayerState } from "./player-state.ts";
import { type world } from "prismarine-world";

export interface BedrockClientState {
  entities: {
    players: Record<string, PlayerState>;
    uuidToUsername: Record<string, string>;
    entities: Record<string, BedrockEntity & { unique_id?: number }>;
    entity: BedrockEntity;
    player: PlayerState;
    username: string;
  };
  world: {
    subChunkMissHashes: any[];
    cachingEnabled: boolean;
    world: world.WorldSync;
  };
}
