import type { Vec3 } from "vec3";
import type { BedrockEntity } from "./bedrock-entity.ts";
import type { PlayerState } from "./player-state.ts";

export type ClientEvents = {
  entityAttributes: [BedrockEntity];
  playerJoined: [PlayerState];
  playerUpdated: [PlayerState];
  playerLeft: [PlayerState];
  entityGone: [BedrockEntity];
  playerMoved: [BedrockEntity];
  entityMoved: [BedrockEntity];
  entityUpdate: [BedrockEntity];
  entityAttach: [BedrockEntity, BedrockEntity];
  entityDetach: [BedrockEntity, BedrockEntity];
  entitySpawn: [BedrockEntity];
  move: [Vec3];
};
