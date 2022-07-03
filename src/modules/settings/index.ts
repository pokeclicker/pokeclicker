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
} from '../GameConstants';
import HotkeySetting from './HotkeySetting';
import BreedingFilters from './BreedingFilters';
import ProteinFilters from './ProteinFilters';

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
Settings.add(new Setting<string>('breedingDisplay', 'Breeding progress display:',
    [
        new SettingOption('Percentage', 'percentage'),
        new SettingOption('Step count', 'stepCount'),
    ],
    'percentage'));
Settings.add(new Setting<string>('shopButtons', 'Shop amount buttons:',
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
Settings.add(new Setting<string>('backgroundImage', 'Background image:',
    [
        new SettingOption('Day', 'background-day'),
        new SettingOption('Night', 'background-night'),
        new SettingOption('Dynamic', 'background-dynamic'),
    ],
    'background-day'));
Settings.add(new Setting<string>('eggAnimation', 'Egg Hatching Animation:',
    [
        new SettingOption('None', 'none'),
        new SettingOption('Almost & fully ready', 'almost'),
        new SettingOption('Fully ready', 'full'),
    ],
    'full'));
Settings.add(new Setting<string>('hideHatchery', 'Hide Hatchery Modal:',
    [
        new SettingOption('Never', 'never'),
        new SettingOption('Egg Slots Full', 'egg'),
        new SettingOption('Queue Slots Full', 'queue'),
    ],
    'queue'));
Settings.add(new Setting<string>('farmDisplay', 'Farm timer display:',
    [
        new SettingOption('To Next Stage', 'nextStage'),
        new SettingOption('Ripe/Death', 'ripeDeath'),
    ],
    'ripeDeath'));
Settings.add(new BooleanSetting('currencyMainDisplayReduced', 'Shorten currency amount shown on main screen', false));
Settings.add(new BooleanSetting('currencyMainDisplayExtended', 'Show Diamonds, Farm Points and Battle Points on main screen', false));
Settings.add(new BooleanSetting('showGymGoAnimation', 'Show Gym GO animation', true));

// CSS variable settings
Settings.add(new CssVariableSetting('locked', 'Locked Location', [], '#000000'));
Settings.add(new CssVariableSetting('incomplete', 'Incomplete Area', [], '#ff9100'));
Settings.add(new CssVariableSetting('questAtLocation', 'Quest at Location', [], '#55ff00'));
Settings.add(new CssVariableSetting('uncaughtPokemon', 'Uncaught Pokemon', [], '#3498db'));
Settings.add(new CssVariableSetting('uncaughtShinyPokemonAndMissingAchievement', 'Uncaught Shiny Pokemon and Missing Achievement', [], '#c939fe'));
Settings.add(new CssVariableSetting('uncaughtShinyPokemon', 'Uncaught Shiny Pokemon', [], '#ffee00'));
Settings.add(new CssVariableSetting('missingAchievement', 'Missing Achievement', [], '#57e3ff'));
Settings.add(new CssVariableSetting('completed', 'Completed Location', [], '#ffffff'));

// Other settings
Settings.add(new BooleanSetting('disableAutoDownloadBackupSaveOnUpdate', 'Disable automatic backup save downloading when game updates', false));
Settings.add(new BooleanSetting('useWebWorkerForGameTicks', 'Make use of web workers for game ticks (more consistent game speed)', true));
Settings.add(new BooleanSetting('disableOfflineProgress', 'Disable offline progress', false));
Settings.add(new Setting<string>('saveReminder', 'Save reminder interval (in game time):',
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

// Party Sorting
const partySortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('partySort', 'Sort:', partySortSettings, SortOptions.id));
Settings.add(new BooleanSetting('partySortDirection', 'reverse', false));

// Hatchery Sorting
const hatcherySortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('hatcherySort', 'Sort:', hatcherySortSettings, SortOptions.id));
Settings.add(new BooleanSetting('hatcherySortDirection', 'reverse', false));

// Protein Sorting
const proteinSortSettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('proteinSort', 'Sort:', proteinSortSettings, SortOptions.id));
Settings.add(new BooleanSetting('proteinSortDirection', 'reverse', false));
Settings.add(new BooleanSetting('proteinHideMaxedPokemon', 'Hide Pokémon with max protein', false));
Settings.add(new BooleanSetting('proteinHideShinyPokemon', 'Hide shiny Pokémon', false));

// Protein filters
Object.keys(ProteinFilters).forEach((key) => {
    // One-off because search isn't stored in settings
    if (key === 'search') {
        return;
    }
    const filter = ProteinFilters[key];
    Settings.add(new Setting<string>(filter.optionName, filter.displayName, filter.options || [], filter.value().toString()));
});

// Breeding Filters
Object.keys(BreedingFilters).forEach((key) => {
    // One-off because search isn't stored in settings
    if (key === 'search') {
        return;
    }
    const filter = BreedingFilters[key];
    Settings.add(new Setting<string>(filter.optionName, filter.displayName, filter.options || [], filter.value().toString()));
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
        new SettingOption('Pokedex ID', 'dexId'),
        new SettingOption('Proteins used', 'proteins'),
        new SettingOption('EVs', 'evs'),
    ],
    'attack'));

// Achievement sorting
const achievementSortSettings = Object.keys(AchievementSortOptionConfigs).map((opt) => (
    new SettingOption<number>(AchievementSortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('achievementSort', 'Sort:', achievementSortSettings, AchievementSortOptions.default));
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
Settings.add(new Setting<string>('achievementsRegion', 'achievementsRegion',
    [
        new SettingOption('All', '-2'),
        ...Settings.enumToSettingOptionArray(Region),
    ],
    '-2'));

// Save menu sorting
Settings.add(new Setting('sort.saveSelector', 'Saves sort order', [], ''));

// Hotkeys
Settings.add(new HotkeySetting('hotkey.farm', 'Farm', 'F'));
Settings.add(new HotkeySetting('hotkey.hatchery', 'Hatchery', 'H'));
Settings.add(new HotkeySetting('hotkey.oakItems', 'Oak Items', 'O'));
Settings.add(new HotkeySetting('hotkey.underground', 'Underground', 'U'));
Settings.add(new HotkeySetting('hotkey.pokeballSelection', 'Pokéball Selection', 'P', { suffix: ' + Number' }));

Settings.add(new HotkeySetting('hotkey.farm.toggleShovel', 'Toggle Shovel', 'S'));

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

Settings.add(new HotkeySetting('hotkey.shop.buy', 'Buy item', 'B'));
Settings.add(new HotkeySetting('hotkey.shop.max', 'Select max amount', 'M'));
Settings.add(new HotkeySetting('hotkey.shop.reset', 'Reset amount', 'R'));
Settings.add(new HotkeySetting('hotkey.shop.increase', 'Increase amount', 'I'));

/*
 * SUBSCRIBERS
 */
Settings.getSetting('backgroundImage').observableValue.subscribe((newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newValue === 'background-dynamic' ? DynamicBackground.startScene() : DynamicBackground.stopScene();
});
