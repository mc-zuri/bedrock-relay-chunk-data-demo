# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Minecraft Bedrock Edition client implementation that supports three operation modes:
1. **Proxy Client** - Acts as a relay between a Minecraft client and server, intercepting and recording packets
2. **Replay Client** - Replays previously recorded packet dumps for analysis and debugging
3. **Direct Client** - Connects directly to Minecraft servers

The project features a web-based viewer (using prismarine-viewer) that visualizes game state in real-time by converting Bedrock chunk data to Java Edition format for rendering.

## Commands

### Running the Application

```bash
npm start
```

This uses Node's experimental TypeScript support (`--experimental-strip-types`) to run the application directly without compilation.

### Installing Dependencies

```bash
npm install
```

Note: The project uses `patch-package` to apply patches to dependencies during postinstall.

## Architecture

### Client Modes

The application entry point (`src/main.ts`) has three commented-out client configurations:

1. **BedrockProxyClient**: Relays traffic between client and server, optionally saving packet dumps
2. **BedrockReplayClient**: Replays recorded packet dumps with accurate timing
3. **BedrockClient**: Direct connection to servers (implementation in separate file)

To use a specific mode, uncomment the relevant client instantiation in `src/main.ts`.

### Event-Driven Architecture

All three client modes share the same event-driven architecture:

**BedrockReplayClient** reads dump files and emits events in the same way as if a real client connected to a server. This means:
- Handlers process the replayed data identically to live data
- The viewer displays the current state based on handler updates
- No code changes needed to switch between live/proxy/replay modes

The flow is: **Packets → Events → Handlers → State Updates → Viewer Rendering**

### Core Components

**BedrockClientBase** (`src/client/bedrock-client-base.ts`)
- Abstract base class for all client implementations
- Manages game state (`BedrockClientState`), world data, entities, and players
- Initializes prismarine libraries (Entity, Chunk, World, Registry) for the specified Bedrock version
- Provides event emitters for server packets (`serverEvents`) and client-side events (`clientEvents`)
- All handlers are automatically registered via `registerAllHandlers()` during initialization

**Packet Handlers** (`src/client/handlers/`)
- Each Bedrock protocol packet has a corresponding handler class
- Active handlers (no `not_used/` prefix): `start_game`, `level_chunk`, `subchunk`, `add_player`, `move_entity`, `update_block`, etc.
- Handlers in `not_used/` are registered but typically no-op implementations
- All handlers follow a static registration pattern: `HandlerClass.register(client)`
- Registration happens automatically in `src/client/handlers/index.ts`
- Handlers listen to `serverEvents`, process packets, and update `client.state`

**World Management**
- Uses prismarine-world for chunk storage and block access
- Supports chunk caching via blob store (`BlobStore`) for subchunk data
- Bedrock chunks are loaded via `level_chunk` and `subchunk` handlers
- Block lookups use `blocksByRuntimeId` from the Bedrock registry

**Web Viewer** (`src/web-view/view.ts`)
- Converts Bedrock world data to Java Edition format for prismarine-viewer
- Runs an Express server with Socket.IO on port 3000 (configurable)
- Maps Bedrock block states to Java block states by name (not perfect state matching)
- Displays player position and allows camera controls (first-person or third-person)
- Uses `WorldView` class to manage visible chunks based on view distance
- Listens to `clientEvents` to update rendering when state changes

**Packet Dump System**
- `PacketDumpWriter`: Records packets with nanosecond timing to binary files in `dumps/`
- `PacketDumpReader`: Replays dumps maintaining original timing between packets
- Format: version string, then repeated (type:char, time:int64, length:int32, buffer:bytes)
- Type 'S' = serverbound, 'C' = clientbound
- BedrockReplayClient uses PacketDumpReader to emit events as if connecting live

### State Management

The `BedrockClientState` interface tracks:
- **entities**: Player and entity objects indexed by runtime ID
- **world**: Chunk data, caching state, subchunk blob hashes
- **Username mappings**: UUID to username lookups

The main player entity is stored in `state.entities.entity` after receiving `start_game`.

Handlers update this shared state, and the viewer reads from it to render the world.

### TypeScript Configuration

This project uses Node's experimental TypeScript type stripping feature (Node flag: `--experimental-strip-types`). Key compiler options:
- `noEmit: true` - No compilation output, types are stripped at runtime
- `rewriteRelativeImportExtensions: true` - Allows `.ts` extensions in imports
- `verbatimModuleSyntax: true` - Strict import/export type handling
- `strict: true` with all strictness flags enabled

All imports must include `.ts` extensions (e.g., `import { Foo } from "./file.ts"`).

## Development Guidelines

### Adding New Packet Handlers

1. Create handler file in `src/client/handlers/` (or `not_used/` if not implemented)
2. Implement handler class with static `register(client: BedrockClientBase)` method
3. Import and register in `src/client/handlers/index.ts`
4. Handler receives typed packet parameter from `protocolTypes`
5. Update `client.state` as needed - changes will be reflected in the viewer

### Working with Chunks

- Bedrock uses 16x16x16 subchunks, Java uses full 16x384x16 chunk columns
- Access blocks: `client.state.world.world.getBlockStateId(vec3Position)`
- Block registry: `client.registry.blocksByRuntimeId[stateId]`
- World events: Listen on `client.clientEvents` for `blockUpdate`, `chunkColumnLoad`, etc.

### Coordinate Systems

- Position conversions use helper functions in `src/client/handlers/helpers/convert-helper.ts`
- `fromNotchianYaw()` / `fromNotchianPitch()` convert Bedrock rotation to standard format
- Y coordinate for viewer rendering needs adjustment (subtract NAMED_ENTITY_HEIGHT: 1.62)

### Recording and Replaying Sessions

To record a session:
1. Use `BedrockProxyClient` with `saveDump: true`
2. Dumps are saved to `dumps/` directory with format `{version}-{timestamp}.bin`

To replay a session:
1. Use `BedrockReplayClient` with the dump file path
2. Optionally set `startDelay` to delay playback start
3. All handlers process replayed packets identically to live packets

## Dependencies

Key libraries:
- **bedrock-protocol**: Minecraft Bedrock protocol implementation and Relay server
- **prismarine-*** suite: World, chunk, entity, and viewer libraries (originally for Java Edition)
- **minecraft-data**: Block and item data for version mapping
- **express + socket.io**: Web viewer server
- **canvas**: Required for prismarine-viewer rendering
- **csbinary**: Binary file I/O for packet dumps

The project targets Minecraft Bedrock version **1.21.111** but can be configured for other versions.