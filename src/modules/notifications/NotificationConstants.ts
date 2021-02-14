import BooleanSetting from '../settings/BooleanSetting';
import Sound from '../utilities/Sound';
import NotificationOption from './NotificationOption';

/**
 * Contains all notification constants for easy access.
 */

const NotificationConstants = {
    NotificationOption,
    NotificationSound: {
        ready_to_hatch: new Sound('ready_to_hatch', 'Egg ready to hatch'),
        empty_queue: new Sound('empty_queue', 'Hatchery queue is empty'),
        shiny_long: new Sound('shiny_long', 'Shiny Pokémon encountered/hatched'),
        new_catch: new Sound('new_catch', 'New Pokémon/shiny captured'),
        achievement: new Sound('achievement', 'New achievement earned'),
        battle_item_timer: new Sound('battle_item_timer', 'Battle item about to wear off'),
        quest_ready_to_complete: new Sound('quest_ready_to_complete', 'Quest is ready to be completed'),
        quest_level_increased: new Sound('quest_level_increased', 'Quest level increased'),
        underground_energy_full: new Sound('underground_energy_full', 'Mining energy reached maximum capacity'),
        berry_is_ripe: new Sound('berry_is_ripe', 'Berry ready to harvest'),
        about_to_wither: new Sound('about_to_wither', 'Berry about to wither'),
        berry_withered: new Sound('berry_withered', 'Berry withered'),
        berry_mutated: new Sound('berry_mutated', 'Berry mutated'),
        berry_replanted: new Sound('berry_replanted', 'Berry replanted'),
        farm_dropped: new Sound('farm_dropped', 'There was a drop on the farm'),
        pokemon_wander: new Sound('pokemon_wander', 'A pokemon wandered onto the farm'),
        mulch_ran_out: new Sound('mulch_ran_out', 'Mulch ran out'),
    },
    NotificationSetting: {
        ready_to_hatch: new BooleanSetting('notification.ready_to_hatch', 'Egg ready to hatch', true),
        hatched: new BooleanSetting('notification.hatched', 'Egg hatched', true),
        hatched_shiny: new BooleanSetting('notification.hatched_shiny', 'Egg hatched a shiny', true),
        empty_queue: new BooleanSetting('empty_queue', 'Hatchery queue is empty', true),
        route_item_found: new BooleanSetting('notification.route_item_found', 'Item found during route battle', true),
        dungeon_item_found: new BooleanSetting('notification.dungeon_item_found', 'Item found in dungeon chest', true),
        battle_item_timer: new BooleanSetting('notification.battle_item_timer', 'Battle item about to wear off', true),
        encountered_shiny: new BooleanSetting('notification.encountered_shiny', 'Encountered a shiny Pokémon', true),
        quest_ready_to_complete: new BooleanSetting('notification.quest_ready_to_complete', 'Quest is ready to be completed', true),
        underground_energy_full: new BooleanSetting('notification.underground_energy_full', 'Mining energy reached maximum capacity', true),
        event_start_end: new BooleanSetting('notification.event_start_end', 'Event start/end information', true),
        dropped_item: new BooleanSetting('notification.dropped_item', 'Enemy Pokémon dropped an item', true),
        berry_is_ripe: new BooleanSetting('notification.berry_is_ripe', 'Berry ready to harvest', true),
        about_to_wither: new BooleanSetting('notification.about_to_wither', 'Berry about to wither', true),
        berry_withered: new BooleanSetting('notification.berry_withered', 'Berry withered', true),
        berry_mutated: new BooleanSetting('notification.berry_mutated', 'Berry mutated', true),
        berry_replanted: new BooleanSetting('notification.berry_replanted', 'Berry replanted', true),
        farm_dropped: new BooleanSetting('notification.farm_dropped', 'There was a drop on the farm', true),
        pokemon_wander: new BooleanSetting('notification.pokemon_wander', 'A pokemon wandered onto the farm', true),
        mulch_ran_out: new BooleanSetting('notification.mulch_ran_out', 'Mulch ran out', true),
        gym_won: new BooleanSetting('notification.gym_won', 'Gym leader defeated', true),
    },
};

export default NotificationConstants;
