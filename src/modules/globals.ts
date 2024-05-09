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
    Pokerus,
    BattlePokemonGender,
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
import type { QuestLineNameType } from './quests/QuestLineNameType';
import type { PokemonNameType } from './pokemons/PokemonNameType';
import type CaughtStatus from './enums/CaughtStatus';
import type { SpecialEventTitleType } from './specialEvents/SpecialEventTitleType';
import type Requirement from './requirements/Requirement';
import type MapAreaStatus from './worldmap/MapAreaStatus';

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
    specialEvents: {
        getEvent: (eventName: SpecialEventTitleType) => any
    } & Record <any, any>,
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

type TmpDungeonType = {
    allAvailablePokemon: () => PokemonNameType[];
    allAvailableShadowPokemon: () => PokemonNameType[];
    isThereQuestAtLocation: () => boolean;
};

type TmpDungeonRunnerType = {
    dungeon: {
        name: string
    };
    isAchievementsComplete: (TmpDungeonType) => boolean;
};

type TmpGymType = {
    town: string;
};

type TmpGymRunnerType = {
    gymObservable: () => TmpGymType;
    getEnvironmentArea: () => Environment;
};

type TmpAchievementHandlerType = {
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

type TmpBattleType = {
    enemyPokemon: KnockoutObservable<unknown>;
    catching: KnockoutObservable<boolean>;
    route: number,
    generateNewEnemy: () => void;
};

type TmpTemporaryBattleType = {
    getTown: () => TmpTownType;
};

type TmpTemporaryBattleRunnerType = {
    getEnvironmentArea: () => Environment;
    battleObservable: KnockoutObservable<TmpTemporaryBattleType>;
};

type TmpTownContentType = {
    isUnlocked: () => boolean;
    areaStatus: () => MapAreaStatus;
};

type TmpTownType = {
    name: string;
    region: Region;
    requirements: Requirement[];
    dungeon?: TmpDungeonType;
    //npcs?: NPC[];
    startingTown: boolean;
    content: TmpTownContentType[];
    subRegion: SubRegions;
    ignoreAreaStatus: boolean;
    isUnlocked: () => boolean;
};

type TmpTownListType = { 
    [name: string]: TmpTownType;
};

type TmpRouteHelperType = {
    getAvailablePokemonList(route: number, region: Region, includeHeadbutt?: boolean): PokemonNameType[];
    routePokerusEVs(route: number, region: Region): string;
    dungeonPokerusEVs(dungeon: TmpDungeonType): string;
    getEvs(possiblePokemon: PokemonNameType[]): number;
    routeCompleted(route: number, region: Region, includeShiny: boolean, includeHeadbutt?: boolean): boolean;
    listCompleted(possiblePokemon: PokemonNameType[], includeShiny: boolean);
    minPokerus(possiblePokemon: PokemonNameType[]): number;
    minPokerusCheck(possiblePokemon: PokemonNameType[]): boolean;
    isAchievementsComplete(route: number, region: Region);
    isThereQuestAtLocation(route: number, region: Region);
};

type TmpDungeonListType = {
    [name: string]: TmpDungeonType;
};

export type TmpPokemonFactoryType = {
    generateShiny(chance: number, skipBonus?: boolean): boolean;
    generateGenderById(id: number): BattlePokemonGender;
};

export type TmpPartyControllerType = {
    getCaughtStatusByName: (name: PokemonNameType) => CaughtStatus;
    getPokerusStatusByName: (name: PokemonNameType) => Pokerus;
};

export type TmpBattleFrontierRunnerType = {
    environment: KnockoutObservable<Environment>;
};

// Where all the magic happens
declare global {
    const App: TmpAppType;
    const player: any;
    const Save: TmpSaveType;
    const DungeonRunner: TmpDungeonRunnerType;
    const GymRunner: TmpGymRunnerType;
    const AchievementHandler: TmpAchievementHandlerType;
    const PokemonFactory: TmpPokemonFactoryType;
    const PartyController: TmpPartyControllerType;
    const Battle: TmpBattleType;
    const TownList: TmpTownListType;
    const RouteHelper: TmpRouteHelperType;
    const TemporaryBattleRunner: TmpTemporaryBattleRunnerType;
    const dungeonList: TmpDungeonListType;
    const BattleFrontierRunner: TmpBattleFrontierRunnerType;
}
