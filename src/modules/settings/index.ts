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

// Other settings
Settings.add(new BooleanSetting('disableAutoDownloadBackupSaveOnUpdate', 'Disable automatic backup save downloading when game updates', false));
Settings.add(new BooleanSetting('currencyMainDisplayReduced', 'Shorten currency amount shown on main screen', false));

// Sound settings
Object.values(NotificationConstants.NotificationSound).forEach((sound) => {
    Settings.add(new BooleanSetting(`sound.${sound.name}`, sound.name, true));
});
Settings.add(new RangeSetting('sound.volume', 'Volume', 0, 100, 1, 100));

// Notification settings
Object.values(NotificationConstants.NotificationSetting).forEach((setting) => {
    Settings.add(setting);
});

/*
 * THESE SETTINGS ARE NOT SUPPOSED TO BE IN THE SETTINGS MENU
 */

// Party Sorting
const sortsettings = Object.keys(SortOptionConfigs).map((opt) => (
    new SettingOption<number>(SortOptionConfigs[opt].text, parseInt(opt, 10))
));
Settings.add(new Setting<number>('partySort', 'Sort:',
    sortsettings,
    SortOptions.id));
Settings.add(new BooleanSetting('partySortDirection', 'reverse', false));

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

// CSS variable settings
Settings.add(new CssVariableSetting('locked', 'Map Color Locked Location', [], '#000'));
Settings.add(new CssVariableSetting('currentPlace', 'Map Color Current Location', [], '#5f0'));
Settings.add(new CssVariableSetting('incomplete', 'Map Color Incomplete Area', [], '#ff9100'));
Settings.add(new CssVariableSetting('uncaughtPokemon', 'Map Color Uncaught Pokemon', [], '#3498db'));
Settings.add(new CssVariableSetting('uncaughtShinyPokemon', 'Map Color Uncaught Shiny Pokemon', [], '#fbff00'));

/*
 * SUBSCRIBERS
 */
Settings.getSetting('backgroundImage').observableValue.subscribe((newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newValue === 'background-dynamic' ? DynamicBackground.startScene() : DynamicBackground.stopScene();
});
