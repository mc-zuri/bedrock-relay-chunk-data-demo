import type { BedrockClientBase } from "../main.ts";
import type { PlayerState, protocolTypes } from "../protocol.js";
import { fetchEntity } from "./helpers/entity-helper.ts";

export class PlayerListHandler {
    static register(client: BedrockClientBase) {
        const handler = new PlayerListHandler(client);
        client.serverEvents.on('player_list', (packet) => handler.handle(packet));
    }

    private client: BedrockClientBase;
    private constructor(client: BedrockClientBase) {
        this.client = client;
    }


    handle(packet: protocolTypes.packet_player_list): void {
        const bot = this.client.state.entities;

        for (const item of packet.records.records) {
            let player: PlayerState | null = bot.uuidToUsername[item.uuid] ? bot.players[bot.uuidToUsername[item.uuid]] : null;

            switch (packet.records.type) {
                case 'add':
                    let newPlayer = false

                    // New Player
                    if (!player) {
                        if (!item.username)
                            return
                        player = bot.players[item.username] = {
                            username: item.username,
                            uuid: item.uuid,
                            displayName: new this.client.ChatMessageConstrutor({ text: '', extra: [{ text: item.username }] } as any),
                            profileKeys: item.xbox_user_id ?? null
                        }

                        bot.uuidToUsername[item.uuid] = item.username
                        this.client.clientEvents.emit('playerJoined', player)
                        newPlayer = true
                    } else {
                        // Just an Update
                        player = bot.players[item.username] = {
                            username: item.username,
                            uuid: item.uuid,
                            displayName: new this.client.ChatMessageConstrutor({ text: '', extra: [{ text: item.username }] } as any),
                            profileKeys: item.xbox_user_id ?? null
                        }
                    }

                    const playerEntity = Object.values(bot.entities).find(e => e.type === 'player' && e.uuid === item.uuid)
                    player.entity = playerEntity
                    if (player.entity)
                        bot.players[item.username]['displayName'] = new this.client.ChatMessageConstrutor({
                            text: '',
                            extra: [{ text: player.entity.nametag }]
                        } as any)


                    if (playerEntity === bot.entity) {
                        bot.player = player
                    }

                    if (!newPlayer) {
                        this.client.clientEvents.emit('playerUpdated', player!)
                    }


                    break;
                case 'remove':
                    if (!player) return
                    if (player.entity === bot.entity) return

                    // delete entity
                    if (player.entity) {
                        const id = player.entity.id
                        const entity = fetchEntity(id, this.client)
                        this.client.clientEvents.emit('entityGone', entity)
                        entity.isValid = false
                        player.entity = undefined
                        delete bot.entities[id]
                    }


                    delete bot.players[player.username]
                    delete bot.uuidToUsername[item.uuid]
                    this.client.clientEvents.emit('playerLeft', player)

                    break;
            }
        }
    }
}
