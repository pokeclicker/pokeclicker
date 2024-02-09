import Settings from './Settings';
import Setting from './Setting';
import SettingOption from './SettingOption';
import BooleanSetting from './BooleanSetting';
import CssVariableSetting from './CssVariableSetting';
import RangeSetting from './RangeSetting';
import NotificationConstants from '../notifications/NotificationConstants';
import DynamicBackground from '../background/DynamicBackground';
import { SortOptionConfigs, SortOptions } from './SortOptions';
import { AchievementSortOptionConfigs, AchievementSortOptions } from '../achievements/AchievementSortOptions';
import {
    Region,
    AchievementType,
    HOUR,
    DAY,
    ExtraAchievementCategories,
    camelCaseToString,
    ModalCollapseList,
    getDungeonIndex,
} from '../GameConstants';
import HotkeySetting from './HotkeySetting';
import Language, { LanguageNames } from '../translation/Language';
import BreedingFilters from './BreedingFilters';
import GameHelper from '../GameHelper';
import PokemonType from '../enums/PokemonType';
import PokedexFilters from './PokedexFilters';
import FilterSetting from './FilterSetting';
import { LogBookTypes } from '../logbook/LogBookTypes';
import QuestLineStartedRequirement from '../requirements/QuestLineStartedRequirement';
import ClearDungeonRequirement from '../requirements/ClearDungeonRequirement';

export default Settings;

/*
 * THESE SETTINGS SHOULD ALL BE PUT IN SETTINGS MENU
 */

// Display settings
Settings.add(
    new Setting<string>('theme', 'Theme',
        [
            new SettingOption('Cerulean', 'cerulean'),
            new SettingOption('Cosmo', 'cosmo'),
            new SettingOption('Cyborg', 'cyborg'),
            new SettingOption('Darkly', 'darkly'),
            new SettingOption('Flatly', 'flatly'),
            new SettingOption('Journal', 'journal'),
            new SettingOption('Litera', 'litera'),
            new SettingOption('Lumen', 'lumen'),
            new SettingOption('Lux', 'lux'),
            new SettingOption('Materia', 'materia'),
            new SettingOption('Minty', 'minty'),
            new SettingOption('Pulse', 'pulse'),
            new SettingOption('Sandstone', 'sandstone'),
            new SettingOption('Simplex', 'simplex'),
            new SettingOption('Sketchy', 'sketchy'),
            new SettingOption('Slate', 'slate'),
            new SettingOption('Solar', 'solar'),
            new SettingOption('Spacelab', 'spacelab'),
            new SettingOption('Superhero', 'superhero'),
            new SettingOption('United', 'united'),
            new SettingOption('Yeti (default)', 'yeti'),
        ],
        'yeti'),
);
Settings.add(new Setting<string>('breedingDisplay', 'Breeding progress display',
    [
        new SettingOption('Percentage', 'percentage'),
        new SettingOption('Step count', 'stepCount'),
    ],
    'stepCount'));
Settings.add(new Setting<string>('shopButtons', 'Shop amount buttons',
    [
        new SettingOption('+10, +100', 'original'),
        new SettingOption('+100, +1000', 'bigplus'),
        new SettingOption('×10, ÷10', 'multiplication'),
    ],
    'original'));
Settings.add(new BooleanSetting('resetShopAmountOnPurchase', 'Reset buy quantity after each purchase', true));
Settings.add(new BooleanSetting('showCurrencyGainedAnimation', 'Show currency gained animation', true));
Settings.add(new BooleanSetting('showCurrencyLostAnimation', 'Show currency lost animation', true));
Settings.add(new BooleanSetting('hideChallengeRelatedModules', 'Hide challenge related modules', false));
Settings.add(new BooleanSetting('disableRightClickMenu', 'Disable the right click menu', true));
Settings.add(new Setting<string>('backgroundImage', 'Background image',
    [
        new SettingOption('Day', 'background-day'),
        new SettingOption('Night', 'background-night'),
        new SettingOption('Dynamic', 'background-dynamic'),
    ],
    'background-day'));
Settings.add(new Setting<string>('eggAnimation', 'Egg Hatching Animation',
    [
        new SettingOption('None', 'none'),
        new SettingOption('Almost & fully ready', 'almost'),
        new SettingOption('Fully ready', 'full'),
    ],
    'full'));
Settings.add(new Setting<string>('hideHatchery', 'Hide Hatchery Modal',
    [
        new SettingOption('Never', 'never'),
        new SettingOption('Egg Slots Full', 'egg'),
        new SettingOption('Queue Slots Full', 'queue'),
    ],
    'queue'));
Settings.add(new BooleanSetting('hideQuestsOnFull', 'Hide Quest Menu on full questslots', true));
Settings.add(new Setting<string>('farmDisplay', 'Farm timer display',
    [
        new SettingOption('To Next Stage', 'nextStage'),
        new SettingOption('Ripe/Death', 'ripeDeath'),
    ],
    'ripeDeath'));
Settings.add(new BooleanSetting('farmBoostDisplay', 'Include base farm timer during altered berry growth times', false));
Settings.add(new Setting<string>('berryDexMode', 'Berrydex Display',
    [
        new SettingOption('Classic Mode', 'classic'),
        new SettingOption('Preview Mode', 'preview'),
    ],
    'classic'));
Settings.add(new Setting<string>('sizeUnits', 'Berry size units',
    [
        new SettingOption('Inches', 'inch'),
        new SettingOption('Centimeters', 'cm'),
    ],
    'cm'));
Settings.add(new BooleanSetting('currencyMainDisplayReduced', 'Shorten currency amount shown on main screen', false));
Settings.add(new BooleanSetting('currencyMainDisplayExtended', 'Show Diamonds, Farm Points, Battle Points, and Contest Tokens on main screen', false));
Settings.add(new BooleanSetting('confirmLeaveDungeon', 'Confirm before leaving dungeons', false));
Settings.add(new BooleanSetting('confirmBeformeMulchingAllPlots', 'Confirm before mulching all plots', false));
Settings.add(new BooleanSetting('breedingQueueClearConfirmation', 'Confirm before clearing the hatchery queue', true));
Settings.add(new BooleanSetting('confirmChangeHeldItem', 'Confirm before removing or replacing a Held Item', true));
Settings.add(new BooleanSetting('showGymGoAnimation', 'Show Gym GO animation', true));
Settings.add(new Setting<string>('gameDisplayStyle', 'Game display style',
    [
        new SettingOption('Standard (3 columns)', 'standard3'),
        new SettingOption('Full width (3 columns)', 'fullWidth3'),
        new SettingOption('Full width (5 columns)', 'fullWidth5'),
    ],
    'standard3'));
Settings.add(new BooleanSetting('showMuteButton', 'Show mute/unmute button', true));

// CSS variable settings
Settings.add(new CssVariableSetting('locked', 'Locked Location', [], '#000000'));
Settings.add(new CssVariableSetting('incomplete', 'Incomplete Area', [], '#ff9100'));
Settings.add(new CssVariableSetting('questAtLocation', 'Quest at Location', [], '#55ff00'));
Settings.add(new CssVariableSetting('uncaughtPokemon', 'Uncaught Pokemon', [], '#3498db'));
Settings.add(new CssVariableSetting('uncaughtShadowPokemon', 'Uncaught Shadow Pokemon', [], '#a11131', new QuestLineStartedRequirement('Shadows in the Desert')));
Settings.add(new CssVariableSetting('uncaughtShinyPokemonAndMissingAchievement', 'Uncaught Shiny Pokemon and Missing Achievement', [], '#c939fe'));
Settings.add(new CssVariableSetting('uncaughtShinyPokemon', 'Uncaught Shiny Pokemon', [], '#ffee00'));
Settings.add(new CssVariableSetting('missingAchievement', 'Missing Achievement', [], '#57e3ff'));
Settings.add(new CssVariableSetting('missingResistant', 'Missing Resistant', [], '#ab1707', new ClearDungeonRequirement(1, getDungeonIndex('Distortion World'))));
Settings.add(new CssVariableSetting('completed', 'Completed Location', [], '#ffffff'));

// Other settings
Settings.add(new BooleanSetting('disableAutoDownloadBackupSaveOnUpdate', 'Disable automatic backup save downloading when game updates', false));
Settings.add(new BooleanSetting('useWebWorkerForGameTicks', 'Make use of web workers for game ticks (more consistent game speed)', true));
Settings.add(new BooleanSetting('disableOfflineProgress', 'Disable offline progress', false));
Settings.add(new Setting<string>('saveReminder', 'Save reminder interval (in game time)',
    [
        new SettingOption('Never', '0'),
        new SettingOption('1 Hour', (1 * HOUR).toString()),
        new SettingOption('3 Hours', (3 * HOUR).toString()),
        new SettingOption('6 Hours', (6 * HOUR).toString()),
        new SettingOption('12 Hours', (12 * HOUR).toString()),
        new SettingOption('24 Hours', (24 * HOUR).toString()),
        new SettingOption('2 Days', (2 * DAY).toString()),
        new SettingOption('3 Days', (3 * DAY).toString()),
        new SettingOption('4 Days', (4 * DAY).toString()),
        new SettingOption('5 Days', (5 * DAY).toString()),
        new SettingOption('6 Days', (6 * DAY).toString()),
        new SettingOption('7 Days', (7 * DAY).toString()),
    ],
    (12 * HOUR).toString()));
Settings.add(new BooleanSetting('disableAutoSave', 'Disable Auto Save', false));
Settings.add(new Setting('breedingQueueSizeSetting', 'Breeding Queue Size', [], '-1'));

// Sound settings
Object.values(NotificationConstants.NotificationSound).forEach((soundGroup) => {
    Object.values(soundGroup).forEach((sound) => {
        Settings.add(new BooleanSetting(`sound.${sound.name}`, sound.name, true));
    });
});
Settings.add(new RangeSetting('sound.volume', 'Volume', 0, 100, 1, 100));

// Notification settings
Object.values(NotificationConstants.NotificationSetting).forEach((settingsGroup) => {
    Object.values(settingsGroup).forEach((setting) => {
        if (setting.inGameNotification !== undefined) {
            Settings.add(setting.inGameNotification);
        }
        Settings.add(setting.desktopNotification);
    });
});

/*
 * THESE SETTINGS ARE NOT SUPPOSED TO BE IN THE SETTINGS MENU
 */

// Party
Settings.add(new BooleanSetting('partyHideShinySprites', 'Hide party shiny sprites', false));

// Party Sorting
const partySortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('partySort', 'Sort', partySortSettings, SortOptions.id));
Settings.add(new BooleanSetting('partySortDirection', 'reverse', false));

// Hatchery Sorting
const hatcherySortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
)).filter((opt) => ![SortOptions.level, SortOptions.attack].includes(opt.value));
Settings.add(new Setting<number>('hatcherySort', 'Sort', hatcherySortSettings, SortOptions.id));
Settings.add(new BooleanSetting('hatcherySortDirection', 'reverse', false));

// Vitamin Sorting
const vitaminSortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('vitaminSort', 'Sort', vitaminSortSettings, SortOptions.id));
Settings.add(new BooleanSetting('vitaminSortDirection', 'reverse', false));
Settings.add(new BooleanSetting('vitaminHideMaxedPokemon', 'Hide Pokémon with max vitamin', false));
Settings.add(new BooleanSetting('vitaminHideShinyPokemon', 'Hide shiny Pokémon', false));
Settings.add(new Setting<string>('vitaminSearchFilter', 'Search', [], ''));
Settings.add(new Setting<number>('vitaminRegionFilter', 'Region', [new SettingOption('All', -2), ...Settings.enumToNumberSettingOptionArray(Region)], -2));
Settings.add(new Setting<number>('vitaminTypeFilter', 'Type', [new SettingOption('All', -2), ...Settings.enumToNumberSettingOptionArray(PokemonType, (t) => t !== 'None')], -2));

// Consumable Sorting
const consumableSortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('consumableSort', 'Sort', consumableSortSettings, SortOptions.id));
Settings.add(new BooleanSetting('consumableSortDirection', 'reverse', false));
Settings.add(new BooleanSetting('consumableHideShinyPokemon', 'Hide shiny Pokémon', false));
Settings.add(new Setting<string>('consumableSearchFilter', 'Search', [], ''));
Settings.add(new Setting<number>('consumableRegionFilter', 'Region', [new SettingOption('All', -2), ...Settings.enumToNumberSettingOptionArray(Region)], -2));
Settings.add(new Setting<number>('consumableTypeFilter', 'Type', [new SettingOption('All', -2), ...Settings.enumToNumberSettingOptionArray(PokemonType, (t) => t !== 'None')], -2));

// Held Item Sorting
const heldItemSortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('heldItemSort', 'Sort:', heldItemSortSettings, SortOptions.id));
Settings.add(new BooleanSetting('heldItemSortDirection', 'reverse', false));
Settings.add(new Setting<string>('heldItemSearchFilter', 'Search', [], ''));
Settings.add(new Setting<number>('heldItemRegionFilter', 'Region', [new SettingOption('All', -2), ...Settings.enumToNumberSettingOptionArray(Region)], -2));
Settings.add(new Setting<number>('heldItemTypeFilter', 'Type', [new SettingOption('All', -2), ...Settings.enumToNumberSettingOptionArray(PokemonType, (t) => t !== 'None')], -2));
Settings.add(new BooleanSetting('heldItemHideHoldingPokemon', 'Hide Pokémon holding an item', false));
Settings.add(new BooleanSetting('heldItemShowHoldingThisItem', 'Show only Pokémon holding this item', false));

// Breeding Filters
Object.keys(BreedingFilters).forEach((key) => {
    // One-off because search isn't stored in settings
    if (key === 'search') {
        return;
    }
    const filter = BreedingFilters[key];
    Settings.add(new Setting<string>(filter.optionName, filter.displayName, filter.options || [], filter.value().toString()));
});

// Pokedex Filters
Object.keys(PokedexFilters).forEach((key) => {
    // dont store name filter
    if (key === 'name') {
        return;
    }
    const filter = PokedexFilters[key];
    Settings.add(new FilterSetting(filter));
});



Settings.add(new Setting<string>('breedingDisplayFilter', 'breedingDisplayFilter',
    [
        new SettingOption('Attack', 'attack'),
        new SettingOption('Attack Bonus', 'attackBonus'),
        new SettingOption('Base Attack', 'baseAttack'),
        new SettingOption('Egg Steps', 'eggSteps'),
        new SettingOption('Times Hatched', 'timesHatched'),
        new SettingOption('Breeding Efficiency', 'breedingEfficiency'),
        new SettingOption('Steps per Attack Bonus', 'stepsPerAttack'),
        new SettingOption('Pokémon ID #', 'dexId'),
        new SettingOption('Vitamins used', 'vitamins'),
        new SettingOption('EVs', 'evs'),
    ],
    'attack'));

Settings.add(new Setting<string>('breedingRegionalAttackDebuffSetting', 'breedingRegionalAttackDebuffSetting',
    [
        ...Settings.enumToSettingOptionArray(Region),
    ],
    '-1'));

// Achievement sorting
const achievementSortSettings = Object.keys(AchievementSortOptionConfigs).map((opt) => (
    new SettingOption<number>(AchievementSortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('achievementSort', 'Sort', achievementSortSettings, AchievementSortOptions.default));
Settings.add(new BooleanSetting('achievementSortDirection', 'reverse', false));

// Achievements Filters
Settings.add(new Setting<number>('achievementsPage', 'achievementsPage', [], 0));
Settings.add(new Setting<string>('achievementsStatus', 'achievementsStatus',
    [
        new SettingOption('All', '-2'),
        new SettingOption('Incomplete', '0'),
        new SettingOption('Completed', '1'),
    ],
    '-2'));
Settings.add(new Setting<string>('achievementsType', 'achievementsType',
    [
        new SettingOption('All', '-2'),
        ...Settings.enumToSettingOptionArray(AchievementType, (a) => a !== 'None'),
    ],
    '-2'));
Settings.add(new Setting<string>('achievementsCategory', 'achievementsCategory',
    [
        new SettingOption('All', 'all'),
        ...GameHelper.enumStrings(Region)
            .concat(GameHelper.enumStrings(ExtraAchievementCategories))
            .filter((r) => r !== 'none' && r !== 'final')
            .map((r) => new SettingOption(camelCaseToString(r), r)),
    ],
    'all'));

// Save menu sorting
Settings.add(new Setting('sort.saveSelector', 'Saves sort order', [], ''));

Settings.add(new Setting('saveFilename', 'Save file name', [], '[v{version}] PokeClicker {date}'));

// Mute toggle
Settings.add(new BooleanSetting('sound.muted', 'Mute All Sounds', false));

// Hotkeys
Settings.add(new HotkeySetting('hotkey.farm', 'Farm', 'F'));
Settings.add(new HotkeySetting('hotkey.hatchery', 'Hatchery', 'H'));
Settings.add(new HotkeySetting('hotkey.oakItems', 'Oak Items', 'O'));
Settings.add(new HotkeySetting('hotkey.underground', 'Underground', 'U'));
Settings.add(new HotkeySetting('hotkey.shop', 'Poké Mart', 'E'));
Settings.add(new HotkeySetting('hotkey.dailyQuests', 'Daily Quests', 'Q'));
Settings.add(new HotkeySetting('hotkey.pokeballSelection', 'Poké Ball Selection', 'P', { suffix: ' + Number' }));

Settings.add(new HotkeySetting('hotkey.farm.toggleShovel', 'Toggle Shovel', 'S'));
Settings.add(new HotkeySetting('hotkey.farm.togglePlotSafeLock', 'Toggle Plot Lock', 'L', { suffix: ' or Shift + Click' }));

Settings.add(new HotkeySetting('hotkey.underground.hammer', 'Switch to Hammer', 'H'));
Settings.add(new HotkeySetting('hotkey.underground.chisel', 'Switch to Chisel', 'C'));
Settings.add(new HotkeySetting('hotkey.underground.survey', 'Survey', 'S'));
Settings.add(new HotkeySetting('hotkey.underground.bomb', 'Bomb', 'B'));

Settings.add(new HotkeySetting('hotkey.dungeon.up', 'Move Up', 'W', { prefix: '↑ or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.left', 'Move Left', 'A', { prefix: '← or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.down', 'Move Down', 'S', { prefix: '↓ or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.right', 'Move Right', 'D', { prefix: '→ or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.interact', 'Interact', 'Space'));

Settings.add(new HotkeySetting('hotkey.town.start', 'Starts first content in the town', 'Space'));
Settings.add(new HotkeySetting('hotkey.forceSave', 'Force save game', 'S', { prefix: 'Shift + ' }));
Settings.add(new HotkeySetting('hotkey.downloadSave', 'Download save game', 'D', { prefix: 'Shift + ' }));
Settings.add(new HotkeySetting('hotkey.mute', 'Mute/Unmute Sounds', 'M', { prefix: 'Shift + ' }));

Settings.add(new HotkeySetting('hotkey.shop.buy', 'Buy item', 'B'));
Settings.add(new HotkeySetting('hotkey.shop.max', 'Select max amount', 'M'));
Settings.add(new HotkeySetting('hotkey.shop.reset', 'Reset amount', 'R'));
Settings.add(new HotkeySetting('hotkey.shop.increase', 'Increase amount', 'I'));

Settings.add(new HotkeySetting('hotkey.safari.ball', 'Throw Ball', 'C'));
Settings.add(new HotkeySetting('hotkey.safari.bait', 'Throw Bait', 'B'));
Settings.add(new HotkeySetting('hotkey.safari.rock', 'Throw Rock', 'R'));
Settings.add(new HotkeySetting('hotkey.safari.run', 'Run', 'F'));

// Discord
Settings.add(new BooleanSetting('discord-rp.enabled', 'Discord RP enabled', true));
Settings.add(new Setting('discord-rp.line-1', 'Discord line 1 text', [], 'Shinies: {caught_shiny}/{caught} {sparkle}'));
Settings.add(new Setting('discord-rp.line-2', 'Discord line 2 text', [], 'Total Attack: {attack}'));
Settings.add(new BooleanSetting('discord-rp.timer', 'Show current session play time (max 24 hours)', false));
Settings.add(new BooleanSetting('discord-rp.timer-reset', 'Reset timer on area change', false));
Settings.add(new Setting('discord-rp.large-image', 'Discord main image',
    [
        new SettingOption('None', ''),
        new SettingOption('PokéClicker Logo', 'pokeclickerlogo'),
        new SettingOption('Current Area Environment', 'current-environment'),
        new SettingOption('Cave Environment', 'background-cave'),
        new SettingOption('Cave Gem Environment', 'background-cave-gem'),
        new SettingOption('Fire Environment', 'background-fire'),
        new SettingOption('Forest Environment', 'background-forest'),
        new SettingOption('Grass Environment', 'background-grass'),
        new SettingOption('Graveyard Environment', 'background-graveyard'),
        new SettingOption('Ice Environment', 'background-ice'),
        new SettingOption('Mansion Environment', 'background-mansion'),
        new SettingOption('Power Plant Environment', 'background-power-plant'),
        new SettingOption('Water Environment', 'background-water'),
    ],
    'pokeclickerlogo'));
Settings.add(new Setting('discord-rp.small-image', 'Discord small image',
    [
        new SettingOption('None', ''),
        new SettingOption('Money', 'money'),
        new SettingOption('Dungeon Tokens', 'dungeonToken'),
        new SettingOption('Quest Points', 'questPoint'),
        new SettingOption('Farm Points', 'farmPoint'),
        new SettingOption('Diamonds', 'diamond'),
        new SettingOption('Battle Points', 'battlePoint'),
        new SettingOption('Trainer', 'trainer'),
        new SettingOption('Egg', 'egg'),
        new SettingOption('Poké Ball', 'pokeball'),
        new SettingOption('Cycle All', 'cycle'),
    ],
    'cycle'));

/*
 * SUBSCRIBERS
 */
Settings.getSetting('backgroundImage').observableValue.subscribe((newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newValue === 'background-dynamic' ? DynamicBackground.startScene() : DynamicBackground.stopScene();
});

// Translation
Settings.add(new Setting<Language>('translation.language', 'Language (beta)', Settings.enumToSettingOptionArray(Language, () => true, LanguageNames) as unknown as SettingOption<Language>[], Language.en));

// Logs Settings
Object.keys(LogBookTypes).forEach((logBookType) => {
    Settings.add(new BooleanSetting(`logBook.${logBookType}`, logBookType, true));
});

Settings.add(new BooleanSetting('catchFilters.initialEnabled', 'New Catch Filters initially enabled', false));
Settings.add(new BooleanSetting('catchFilters.invertPriorityOrder', 'Catch Filters priority inverted (bottom-to-top)', false));
Settings.add(new BooleanSetting('breedingEfficiencyAllModifiers', 'Include attack modifiers (held item, EVs, shadow/purified) in Breeding Efficiency', true));

// Modal Collapsible Panels
ModalCollapseList.forEach((collapse) => {
    Settings.add(new BooleanSetting(`modalCollapse.${collapse}`, 'Modal Collapse', true));
});

// Resizable modules
Settings.add(new Setting<number>('moduleHeight.pokeballSelector', '', [], 265));
Settings.add(new Setting<number>('moduleHeight.pokemonList', '', [], 365));
