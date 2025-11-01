import type { BedrockClientBase, BedrockEntity } from "../../main.ts";

export function fetchEntity(id: number, client: BedrockClientBase): BedrockEntity {
    function searchByUUID(obj: Record<string, BedrockEntity>, unique_id: number) {
        for (const key in obj) {
            if (obj[key].unique_id === unique_id) {
                return obj[key];
            }
        }
        return null;
    }
    if (id < 0) {
        let entity = searchByUUID(client.state.entities.entities, id)
        if (entity) {
            return entity
        } else {
            return client.createEntity(id);
        }
    }

    return client.state.entities.entities[id] || (client.state.entities.entities[id] = client.createEntity(id))
}