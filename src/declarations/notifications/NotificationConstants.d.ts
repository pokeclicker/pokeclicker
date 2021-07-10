/// <reference path="../settings/BooleanSetting.d.ts"/>
/// <reference path="../utilities/Sound.d.ts"/>
/// <reference path="./NotificationOption.d.ts"/>
/**
 * Contains all notification constants for easy access.
 */
declare const NotificationConstants: {
    NotificationOption: typeof NotificationOption;
    NotificationSound: {
        ready_to_hatch: Sound;
        empty_queue: Sound;
        shiny_long: Sound;
        new_catch: Sound;
        achievement: Sound;
        battle_item_timer: Sound;
        quest_ready_to_complete: Sound;
        quest_level_increased: Sound;
        underground_energy_full: Sound;
        ready_to_harvest: Sound;
    };
    NotificationSetting: {
        ready_to_hatch: BooleanSetting;
        hatched: BooleanSetting;
        hatched_shiny: BooleanSetting;
        empty_queue: BooleanSetting;
        route_item_found: BooleanSetting;
        dungeon_item_found: BooleanSetting;
        battle_item_timer: BooleanSetting;
        encountered_shiny: BooleanSetting;
        quest_ready_to_complete: BooleanSetting;
        underground_energy_full: BooleanSetting;
        event_start_end: BooleanSetting;
        dropped_item: BooleanSetting;
        ready_to_harvest: BooleanSetting;
        gym_won: BooleanSetting;
    };
};
