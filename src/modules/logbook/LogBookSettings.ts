import BooleanSetting from '../settings/BooleanSetting';

/**
 * Contains all LogBook settings for easy access.
 */

const LogBookSettings = {
    LogBookOptions: {
        logbook_new: new BooleanSetting('logbook_new', 'Newly encountered Pokémon', true),
        logbook_shiny: new BooleanSetting('logbook_shiny', 'Shiny Pokémon', true),
        logbook_caught: new BooleanSetting('logbook_caught', 'Caught Pokémon', true),
        logbook_escaped: new BooleanSetting('logbook_escaped', 'Escaped Pokémon', true),
        logbook_found: new BooleanSetting('logbook_found', 'Found items', true),
        logbook_achievement: new BooleanSetting('logbook_achievement', 'Completed achievements', true),
        logbook_quest_complete: new BooleanSetting('logbook_quest', 'Completed quests', true),
        logbook_wander: new BooleanSetting('logbook_wander', 'Wandering Pokémon', true),
    },
};

export default LogBookSettings;
