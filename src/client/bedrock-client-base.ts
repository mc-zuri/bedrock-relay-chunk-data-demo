import EventEmitter from "events";
import { type Version } from "bedrock-protocol";
import PrismarineRegistry, { type RegistryBedrock } from "prismarine-registry";
import ChatMessageLoader from "prismarine-chat";
import Entity from "prismarine-entity";
import type { protocolTypes } from "../types/protocol.js";
import type { BedrockClientState } from "../types/bedrock-client-state.ts";
import type { BedrockEntity } from "../types/bedrock-entity.ts";
import type { ClientEvents } from "../types/client-events.ts";
import { registerAllHandlers } from "./handlers/index.ts";
import { BlobStore } from "./blob-store.ts";
import PrismarineChunk, { type BedrockChunk } from "prismarine-chunk";
import PrismarineWorld, { type world } from "prismarine-world";

export abstract class BedrockClientBase {
  readonly version: Version;
  readonly registry: RegistryBedrock;
  readonly serverEvents: EventEmitter<protocolTypes.mcpe_packet>;
  readonly clientEvents: EventEmitter<ClientEvents>;
  readonly state: BedrockClientState = {} as any;
  readonly blobStore = new BlobStore();
  readonly userName = "bot";

  readonly EntityConstrutor!: typeof Entity.Entity;
  readonly ChatMessageConstrutor!: typeof ChatMessageLoader.ChatMessage;
  readonly ChunkColumn!: typeof BedrockChunk;

  createEntity(id: number): BedrockEntity {
    const entity = new this.EntityConstrutor(id) as BedrockEntity;
    entity.attributes = {};

    return entity;
  }

  constructor(version: Version) {
    this.serverEvents = new EventEmitter<protocolTypes.mcpe_packet>();
    this.clientEvents = new EventEmitter<ClientEvents>();

    this.version = version;
    this.registry = PrismarineRegistry(`bedrock_${this.version}`) as RegistryBedrock;
    this.EntityConstrutor = (Entity as any)(this.registry);
    this.ChatMessageConstrutor = (ChatMessageLoader as any)(this.registry);
    this.ChunkColumn = (PrismarineChunk as any)(this.registry as any) as typeof BedrockChunk;

    this.state.world = {
      cachingEnabled: false,
      subChunkMissHashes: [],
      world: new ((PrismarineWorld as any)(this.version))().sync as world.WorldSync,
    };

    this.state.world.world.on("blockUpdate", (block) => {
      this.clientEvents.emit("blockUpdate" as any, block as any);
    });

    this.state.world.world.on("chunkColumnLoad", (block) => {
      this.clientEvents.emit("chunkColumnLoad" as any, block as any);
    });

    this.state.world.world.on("chunkColumnUnload", (block) => {
      this.clientEvents.emit("chunkColumnUnload" as any, block as any);
    });

    this.state.entities = {
      entities: {},
      players: {},
      uuidToUsername: {},
    } as any;

    setImmediate(() => {
      registerAllHandlers(this);
    });
  }

  setVersion(version: Version) {}

  queue(name: any, packet: any) {}
}
