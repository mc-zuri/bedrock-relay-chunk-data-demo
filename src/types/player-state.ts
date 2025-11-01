import type { BedrockEntity } from "./protocol.js";

export interface PlayerState {
  username: string;
  uuid: string;
  displayName: unknown;
  profileKeys: unknown;
  entity?: BedrockEntity;
}
