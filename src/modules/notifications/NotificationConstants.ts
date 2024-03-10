import NotificationSetting from '../settings/NotificationSetting';
import Sound from '../utilities/Sound';
import NotificationOption from './NotificationOption';

/**
 * Contains all notification constants for easy access.
 */

const NotificationConstants = {
    NotificationOption,
    NotificationSound: {
        General: {
            shiny_long: new Sound('shiny_long', 'Shiny Pokémon encountered/hatched'),
            new_catch: new Sound('new_catch', 'New Pokémon/shiny captured'),
            roaming: new Sound('roaming', 'Roaming Pokémon encountered'),
            achievement: new Sound('achievement', 'New achievement earned'),
            battle_item_timer: new Sound('battle_item_timer', 'Battle item about to wear off'),
            underground_energy_full: new Sound('underground_energy_full', 'Mining energy reached maximum capacity'),
            battle_frontier: new Sound('battle_frontier', 'Battle Frontier'),
            dream_orb: new Sound('dream_orb', 'Opening Dream Orb'),
            pokerus: new Sound('pokerus_resistant', 'Pokémon has become Resistant to Pokérus'),
            max_flow: new Sound('max_flow', 'Maximum Flow has accumulated at the Purify Chamber'),
        },
        Hatchery: {
            ready_to_hatch: new Sound('ready_to_hatch', 'Egg ready to hatch'),
            empty_queue: new Sound('empty_queue', 'Hatchery queue is empty'),
        },
        Quests: {
            quest_ready_to_complete: new Sound('quest_ready_to_complete', 'Quest is ready to be completed'),
            quest_level_increased: new Sound('quest_level_increased', 'Quest level increased'),
        },
        Farming: {
            berry_discovered: new Sound('berry_discovered', 'New Berry discovered'),
            ready_to_harvest: new Sound('ready_to_harvest', 'Berry ready to harvest'),
            berry_wither: new Sound('ready_to_harvest', 'Berry about to wither/has withered'),
            berry_mutated: new Sound('ready_to_harvest', 'Berry has mutated'),
            berry_replanted: new Sound('ready_to_harvest', 'Berry has been replanted'),
            berry_dropped: new Sound('ready_to_harvest', 'Berry has been dropped'),
            mulch_ran_out: new Sound('ready_to_harvest', 'Mulch has run out'),
            wandering_pokemon: new Sound('wandering', 'Wandering Pokémon encountered'),
        },
    },
    NotificationSetting: {
        General: {
            encountered_shiny: new NotificationSetting('notification.encountered_shiny', 'Encountered a shiny Pokémon', true, 3000),
            encountered_roaming: new NotificationSetting('notification.encountered_roaming', 'Encountered a roaming Pokémon', true, 3000),
            quest_ready_to_complete: new NotificationSetting('notification.quest_ready_to_complete', 'Quest is ready to be completed', true, 5000),
            quest_completed: new NotificationSetting('notification.quest_completed', 'Quest completed', true, 10000),
            event_start_end: new NotificationSetting('notification.event_start_end', 'Event start/end information', true),
            gym_won: new NotificationSetting('notification.gym_won', 'Gym leader defeated', true, 3000),
            offline_earnings: new NotificationSetting('notification.offline_earnings', 'Offline earnings', true, 120000), // 2 Minutes
            achievement_complete: new NotificationSetting('notification.achievement_complete', 'Achievement complete', true, 10000, true),
            new_catch: new NotificationSetting('notification.new_catch', 'New Pokémon/shiny captured', true, 3000, true),
            battle_frontier: new NotificationSetting('notification.battle_frontier', 'Battle Frontier', true, 1800000, true), // 30 Minutes
            pokerus: new NotificationSetting('notification.pokerus', 'Pokémon has become Resistant to Pokérus', true, 3000),
        },
        Hatchery: {
            ready_to_hatch: new NotificationSetting('notification.ready_to_hatch', 'Egg ready to hatch', true, 3000),
            hatched: new NotificationSetting('notification.hatched', 'Egg hatched', true, 3000),
            hatched_shiny: new NotificationSetting('notification.hatched_shiny', 'Egg hatched a shiny', true, 3000),
            empty_queue: new NotificationSetting('empty_queue', 'Hatchery queue is empty', true, 10000),
            hatchery_helper: new NotificationSetting('notification.hatchery_helper', 'Hatchery Helper Hired/Fired', true, 30000),
        },
        Dungeons: {
            dungeon_complete: new NotificationSetting('notification.dungeon_complete', 'Dungeon completed', true, 3000),
            common_dungeon_item_found: new NotificationSetting('notification.common_dungeon_item_found', 'Common Item found in dungeon chest', true, 3000),
            rare_dungeon_item_found: new NotificationSetting('notification.rare_dungeon_item_found', 'Rare Item found in dungeon chest', true, 3000),
        },
        Items: {
            route_item_found: new NotificationSetting('notification.route_item_found', 'Berry found during route battle', true, 3000),
            battle_item_timer: new NotificationSetting('notification.battle_item_timer', 'Battle item about to wear off', true, 3000),
            flute_timer: new NotificationSetting('notification.flute_timer', 'Flute about to run out of gems', true, 60000),
            dropped_item: new NotificationSetting('notification.dropped_item', 'Enemy Pokémon dropped an item', true, 3000),
            item_bought: new NotificationSetting('notification.item_bought', 'Item bought', true, 3000),
        },
        Underground: {
            underground_energy_full: new NotificationSetting('notification.underground_energy_full', 'Mining energy reached maximum capacity', true, 10000),
            underground_energy_restore: new NotificationSetting('notification.underground_energy_restore', 'Mining energy restored', true, 3000),
            underground_dig_deeper: new NotificationSetting('notifcation.underground_dig_deeper', 'You dig deeper...', true, 3000),
            underground_item_found: new NotificationSetting('notification.underground_item_found', 'Item found while mining', true, 3000),
        },
        Farming: {
            berry_discovered: new NotificationSetting('notification.berry_discovered', 'New Berry discovered', true, 3000),
            ready_to_harvest: new NotificationSetting('notification.ready_to_harvest', 'Berry ready to harvest', true, 3000),
            about_to_wither: new NotificationSetting('notification.about_to_wither', 'Berry about to wither', true, 3000),
            berry_withered: new NotificationSetting('notification.berry_withered', 'Berry has withered', true, 3000),
            berry_mutated: new NotificationSetting('notification.berry_mutated', 'Berry has mutated', true, 3000),
            berry_replanted: new NotificationSetting('notification.berry_replanted', 'Berry has been replanted', true, 3000),
            berry_dropped: new NotificationSetting('notification.berry_dropped', 'Berry has been dropped', true, 3000),
            mulch_ran_out: new NotificationSetting('notification.mulch_ran_out', 'Mulch has run out', true, 3000),
            wandering_pokemon: new NotificationSetting('notification.wandering_pokemon', 'Wandering Pokémon encountered', true, 3000),
            farm_hand: new NotificationSetting('notification.farm_hand', 'Farm Hand Hired/Fired', true, 30000),
        },
    },
};

export default NotificationConstants;
