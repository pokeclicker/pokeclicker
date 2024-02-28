// importing only types, as we are "allowed" to have circular type dependencies
import type {
    Observable as KnockoutObservable,
    ObservableArray as KnockoutObservableArray,
    Computed as KnockoutComputed,
} from 'knockout';
import type LogBook from './logbook/LogBook';
import type BadgeCase from './DataStore/BadgeCase';
import type Profile from './profile/Profile';
import type Statistics from './DataStore/StatisticStore';
import type Challenges from './challenges/Challenges';
import type Multiplier from './multiplier/Multiplier';
import type {
    Environment,
    ExtraAchievementCategories,
    GameState,
    Region,
    SubRegions,
} from './GameConstants';
import type Wallet from './wallet/Wallet';
import type PokemonCategories from './party/Category';
import type OakItems from './oakItems/OakItems';
import type OakItemLoadouts from './oakItems/OakItemLoadouts';
import type SaveReminder from './saveReminder/SaveReminder';
import type Translate from './translation/Translation';
import type Achievement from './achievements/Achievement';
import type { AchievementSortOptions } from './achievements/AchievementSortOptions';
import type AchievementCategory from './achievements/AchievementCategory';
import type KeyItems from './keyItems/KeyItems';
import type PokeballFilters from './pokeballs/PokeballFilters';
import { QuestLineNameType } from './quests/QuestLineNameType';
import type CssVariableSetting from './settings/CssVariableSetting';
import type Requirement from './requirements/Requirement';
import type { PokemonNameType } from './pokemons/PokemonNameType';
import type areaStatus from './worldmap/areaStatus';

// These types are only temporary while we are converting things to modules
// As things are converted, we should import their types here for use,
// instead of these cheap imitations.

type TmpGameType = {
    gameState: GameState

    // constructor properties
    update: any,
    profile: Profile,
    breeding: any,
    pokeballs: any,
    pokeballFilters: PokeballFilters,
    wallet: Wallet,
    keyItems: KeyItems,
    badgeCase: BadgeCase,
    oakItems: OakItems,
    oakItemLoadouts: OakItemLoadouts,
    categories: PokemonCategories,
    party: any,
    gems: any,
    underground: any,
    farming: any,
    logbook: LogBook,
    redeemableCodes: any,
    statistics: Statistics,
    quests: {
        getQuestLine: (name: QuestLineNameType) => any
    } & Record<any, any>,
    specialEvents: any,
    discord: any,
    achievementTracker: any,
    challenges: Challenges,
    multiplier: Multiplier,
    saveReminder: SaveReminder,

    // There are functions we could mention too,
    // but they aren't mentioned in any modules (yet?)
};

type TmpAppType = {
    game: TmpGameType,
    isUsingClient: boolean,
    translation: Translate,
    start: ()=>void
};

type TmpSaveType = {
    key: string;
};

type TmpDungeon = {
    allAvailablePokemon: () => PokemonNameType[];
    allAvailableShadowPokemon: () => PokemonNameType[];
    isThereQuestAtLocation: () => boolean;
};

type TmpDungeonRunner = {
    dungeon: {
        name: string
    };
    isAchievementsComplete: (TmpDungeon) => boolean;
};

type TmpGym = {
    town: string;
};

type TmpGymRunner = {
    gymObservable: () => TmpGym;
    getEnvironmentArea: () => Environment;
};

type TmpAchievementHandler = {
    achievementList: Achievement[];
    navigateIndex: KnockoutObservable<number>;
    achievementListFiltered: KnockoutObservableArray<Achievement>;
    numberOfTabs: KnockoutObservable<number>;
    setNavigateIndex: (index: number) => void;
    navigateRight: () => void;
    navigateLeft: () => void;
    isNavigateDirectionDisabled: (navigateBackward: boolean) => boolean;
    calculateNumberOfTabs: () => void;
    filter: Record<string, any>;
    getAchievementListWithIndex: () => void;
    cachedSortedList: Achievement[];
    achievementSortedList: KnockoutComputed<any[]>;
    filterAchievementList: (retainPage: boolean) => void;
    compareBy: (option: AchievementSortOptions, direction: boolean) => (a: Achievement, b: Achievement) => number;
    preCheckAchievements: () => void;
    checkAchievements: () => void;
    addAchievement: (...rest) => void;
    calculateBonus: () => void;
    calculateMaxBonus: () => void;
    achievementBonus: () => number;
    achievementBonusPercent: () => string;
    findByName: (name: string) => Achievement;
    _achievementCategories: AchievementCategory[];
    getAchievementCategories: () => AchievementCategory[]
    getAchievementCategoryByRegion: (region: Region) => AchievementCategory;
    getAchievementCategoryByExtraCategory: (category: ExtraAchievementCategories) => AchievementCategory;
    initialize: (multiplier: Multiplier, challenges: Challenges) => void;
    load: ()=>void
};

type TmpBattle = {
    enemyPokemon: KnockoutObservable<unknown>;
    catching: KnockoutObservable<boolean>;
    route: number,
    generateNewEnemy: () => void;
};

type TmpTemporaryBattle = {
    getTown: () => TmpTown;
};

type TmpTemporaryBattleRunner = {
    getEnvironmentArea: () => Environment;
    battleObservable: KnockoutObservable<TmpTemporaryBattle>;
};

type TmpTownContent = {
    isUnlocked: () => boolean;
    areaStatus: () => areaStatus;
};

type TmpTown = {
    name: string;
    region: Region;
    requirements: Requirement[];
    dungeon?: TmpDungeon;
    //npcs?: NPC[];
    startingTown: boolean;
    content: TmpTownContent[];
    subRegion: SubRegions;
    ignoreAreaStatus: boolean;
    isUnlocked: () => boolean;
};

type TmpTownList = { 
    [name: string]: TmpTown;
};

type TmpRouteHelper = {
    getAvailablePokemonList(route: number, region: Region, includeHeadbutt?: boolean): PokemonNameType[];
    routePokerusEVs(route: number, region: Region): string;
    dungeonPokerusEVs(dungeon: TmpDungeon): string;
    getEvs(possiblePokemon: PokemonNameType[]): number;
    routeCompleted(route: number, region: Region, includeShiny: boolean, includeHeadbutt?: boolean): boolean;
    listCompleted(possiblePokemon: PokemonNameType[], includeShiny: boolean);
    minPokerus(possiblePokemon: PokemonNameType[]): number;
    minPokerusCheck(possiblePokemon: PokemonNameType[]): boolean;
    isAchievementsComplete(route: number, region: Region);
    isThereQuestAtLocation(route: number, region: Region);
};

type TmpDungeonList = {
    [name: string]: TmpDungeon;
};

// Where all the magic happens
declare global {
    const App: TmpAppType;
    const player: any;
    const Save: TmpSaveType;
    const DungeonRunner: TmpDungeonRunner;
    const GymRunner: TmpGymRunner;
    const AchievementHandler: TmpAchievementHandler;
    const Battle: TmpBattle;
    const TownList: TmpTownList;
    const RouteHelper: TmpRouteHelper;
    const TemporaryBattleRunner: TmpTemporaryBattleRunner;
    const dungeonList: TmpDungeonList;
}
