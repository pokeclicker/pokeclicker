import Settings from './Settings';
import Setting from './Setting';
import SettingOption from './SettingOption';
import BooleanSetting from './BooleanSetting';
import CssVariableSetting from './CssVariableSetting';
import RangeSetting from './RangeSetting';
import PokemonType from '../enums/PokemonType';
import NotificationConstants from '../notifications/NotificationConstants';
import DynamicBackground from '../background/DynamicBackground';
import { SortOptionConfigs, SortOptions } from './SortOptions';
import { Region, AchievementType } from '../GameConstants';
import HotkeySetting from './HotkeySetting';

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
    'nextStage'));
Settings.add(new BooleanSetting('currencyMainDisplayReduced', 'Shorten currency amount shown on main screen', false));

// CSS variable settings
Settings.add(new CssVariableSetting('locked', 'Locked Location', [], '#000000'));
Settings.add(new CssVariableSetting('currentPlace', 'Current Location', [], '#55ff00'));
Settings.add(new CssVariableSetting('incomplete', 'Incomplete Area', [], '#ff9100'));
Settings.add(new CssVariableSetting('uncaughtPokemon', 'Uncaught Pokemon', [], '#3498db'));
Settings.add(new CssVariableSetting('uncaughtShinyPokemonAndMissingAchievement', 'Uncaught Shiny Pokemon and Missing Achievement', [], '#c939fe'));
Settings.add(new CssVariableSetting('uncaughtShinyPokemon', 'Uncaught Shiny Pokemon', [], '#ffee00'));
Settings.add(new CssVariableSetting('missingAchievement', 'Missing Achievement', [], '#57e3ff'));
Settings.add(new CssVariableSetting('completed', 'Completed Location', [], '#ffffff'));

// Other settings
Settings.add(new BooleanSetting('disableAutoDownloadBackupSaveOnUpdate', 'Disable automatic backup save downloading when game updates', false));
Settings.add(new BooleanSetting('useWebWorkerForGameTicks', 'Make use of web workers for game ticks (more consistent game speed)', true));

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
        Settings.add(setting);
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

// Breeding Filters
Settings.add(new Setting<string>('breedingCategoryFilter', 'breedingCategoryFilter',
    [],
    '-1'));
Settings.add(new Setting<string>('breedingRegionFilter', 'breedingRegionFilter',
    [
        new SettingOption('All', '-2'),
        ...Settings.enumToSettingOptionArray(Region, (r) => r !== 'none'),
        new SettingOption('None', '-1'),
    ],
    '-2'));
Settings.add(new Setting<string>('breedingTypeFilter1', 'breedingTypeFilter1',
    [
        new SettingOption('All', '-2'),
        ...Settings.enumToSettingOptionArray(PokemonType, (t) => t !== 'None'),
        new SettingOption('None', '-1'),
    ],
    '-2'));
Settings.add(new Setting<string>('breedingTypeFilter2', 'breedingTypeFilter2',
    [
        new SettingOption('All', '-2'),
        ...Settings.enumToSettingOptionArray(PokemonType, (t) => t !== 'None'),
        new SettingOption('None', '-1'),
    ],
    '-2'));
Settings.add(new Setting<string>('breedingShinyFilter', 'breedingShinyFilter',
    [
        new SettingOption('All', '-1'),
        new SettingOption('Not Shiny', '0'),
        new SettingOption('Shiny', '1'),
    ],
    '-1'));
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
    ],
    'attack'));

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
Settings.add(new HotkeySetting('hotkey.farm', 'Open the Farm', 'KeyF'));
Settings.add(new HotkeySetting('hotkey.hatchery', 'Open the Hatchery', 'KeyH'));
Settings.add(new HotkeySetting('hotkey.oakItems', 'Open Oak Items menu', 'KeyO'));
Settings.add(new HotkeySetting('hotkey.underground', 'Open the Underground', 'KeyU'));
Settings.add(new HotkeySetting('hotkey.pokeballMenu', 'Open Pokeball menu', 'KeyP', { suffix: ' + Number' }));

Settings.add(new HotkeySetting('hotkey.farm.toggleShovel', 'Toggle Shovel', 'KeyS'));

Settings.add(new HotkeySetting('hotkey.underground.hammer', 'Switch to Hammer', 'KeyH'));
Settings.add(new HotkeySetting('hotkey.underground.chisel', 'Switch to Chisel', 'KeyC'));
Settings.add(new HotkeySetting('hotkey.underground.survey', 'Survey', 'KeyS'));
Settings.add(new HotkeySetting('hotkey.underground.bomb', 'Bomb', 'KeyB'));

Settings.add(new HotkeySetting('hotkey.dungeon.up', 'Move Up', 'KeyW', { prefix: '↑ or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.left', 'Move Left', 'KeyA', { prefix: '← or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.down', 'Move Down', 'KeyS', { prefix: '↓ or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.right', 'Move Right', 'KeyD', { prefix: '→ or ' }));
Settings.add(new HotkeySetting('hotkey.dungeon.interact', 'Interact', 'Space'));

Settings.add(new HotkeySetting('hotkey.town.start', 'Start Gym/Dungeon', 'Space'));
Settings.add(new HotkeySetting('hotkey.forceSave', 'Force save game', 'KeyS', { prefix: 'Shift + ' }));

/*
 * SUBSCRIBERS
 */
Settings.getSetting('backgroundImage').observableValue.subscribe((newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newValue === 'background-dynamic' ? DynamicBackground.startScene() : DynamicBackground.stopScene();
});
