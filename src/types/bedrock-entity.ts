import Entity from "prismarine-entity";

export interface BedrockEntity extends Entity.Entity {
  attributes: Record<
    string,
    {
      value: number;
      modifiers: any[];
      min: number;
      max: number;
      default: number;
    }
  >;
  unique_id?: number;
  nametag?: string;
}
