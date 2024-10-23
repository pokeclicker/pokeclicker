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
import type * as GameConstants from './GameConstants';
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
import type { Underground } from './underground/Underground';
import type SubRegion from './subRegion/SubRegion';
import type CssVariableSetting from './settings/CssVariableSetting';
import type { EvoData } from './pokemons/evolutions/Base';
import type { PokemonNameType } from './pokemons/PokemonNameType';
import type CaughtStatus from './enums/CaughtStatus';
import type { SpecialEventTitleType } from './specialEvents/SpecialEventTitleType';

/*
    These types are only temporary while we are converting things to modules. As things are converted, 
    we should import their types here for use, instead of these cheap imitations.

    When a file is converted to a module, the types for any /scripts dependencies should be added here
    and declared in globals.ts as globally available. The /scripts file should then check against
    the temporary type defined here.

    For example, an instantiable class

        class Example1 {
            public instanceProperty: string;
        }

    becomes

        // this file
        export type TmpExample1Type = {
            instanceProperty: string;
        }

        // the /scripts file
        class Example1 implements TmpExample1Type {
            public instanceProperty: string;
        }

    Static classes aren't as well supported by TypeScript yet:

        class Example2 {
            public static staticProperty: string;
        }

    becomes

        // this file
        export type TmpExample2Type = {
            staticProperty: string;
        }

        // the /scripts file
        class Example2 {
            public static staticProperty: string;
        }
        Example2 satisfies TmpExample2Type;

    If a class has both static and instance properties, it needs separate types for each. 

*/

// TODO types for classes not yet described
export type TmpUpdateType = any;
export type TmpBreedingType = any;
export type TmpPokeballsType = any;
export type TmpPartyType = any;
export type TmpGemsType = any;
export type TmpFarmingType = any;
export type TmpRedeemableCodesType = any;
export type TmpQuestsType = any;
export type TmpDiscordType = any;
export type TmpAchievementTrackerType = any;
export type TmpBattleFrontierType = any;
export type TmpBattleCafeSaveObjectType = any;
export type TmpDreamOrbControllerType = any;
export type TmpPurifyChamberType = any;
export type TmpWeatherAppType = any;
export type TmpZMovesType = any;
export type TmpPokemonContestType = any;
export type TmpBattlePokemonType = any;
export type TmpMultiplierDecreaserType = any;

export type TmpGameType = {
    gameState: GameConstants.GameState;

    // constructor properties
    update: TmpUpdateType;
    profile: Profile;
    breeding: TmpBreedingType;
    pokeballs: TmpPokeballsType;
    pokeballFilters: PokeballFilters;
    wallet: Wallet;
    keyItems: KeyItems;
    badgeCase: BadgeCase;
    oakItems: OakItems;
    oakItemLoadouts: OakItemLoadouts;
    categories: PokemonCategories;
    party: TmpPartyType;
    gems: TmpGemsType;
    underground: Underground;
    farming: TmpFarmingType;
    logbook: LogBook;
    redeemableCodes: TmpRedeemableCodesType;
    statistics: Statistics;
    quests: TmpQuestsType;
    specialEvents: TmpSpecialEventsType;
    discord: TmpDiscordType;
    achievementTracker: TmpAchievementTrackerType;
    challenges: Challenges;
    battleFrontier: TmpBattleFrontierType;
    multiplier: Multiplier;
    saveReminder: SaveReminder;
    battleCafe: TmpBattleCafeSaveObjectType;
    dreamOrbController: TmpDreamOrbControllerType;
    purifyChamber: TmpPurifyChamberType;
    weatherApp: TmpWeatherAppType;
    zMoves: TmpZMovesType;
    pokemonContest: TmpPokemonContestType;

    // functions
    load: () => void;
    initialize: () => void;
    computeOfflineEarnings: () => void;
    checkAndFix: () => void;
    start: () => void;
    stop: () => void;
    gameTick: () => void;
    save: () => void;
};

export type TmpAppType = {
    debug: boolean;
    game: TmpGameType;
    isUsingClient: boolean;
    translation: Translate;
    start: () => void;
};

export type TmpSaveType = {
    counter: number;
    key: string;
    store: (player: TmpPlayerType) => void;
    getSaveObject: () => void;
    load: () => TmpPlayerType;
    download: () => void;
    copySaveToClipboard: () => void;
    delete: () => Promise<void>;
    filter: (object: any, keep: string[]) => Record<string, any>;
    initializeMultipliers: () => Record<string, number>;
    initializeItemlist: () => Record<string, KnockoutObservable<number>>;
    initializeGems: (saved?: Array<Array<number>>) => Array<Array<KnockoutObservable<number>>>;
    initializeEffects: (saved?: Array<string>) => Record<string, KnockoutObservable<number>>;
    initializeEffectTimer: () => Record<string, KnockoutObservable<string>>;
    loadFromFile: (file) => void;
    convert: () => void;
    convertShinies: (list: Array<any>) => void;
};

export type TmpPlayerType = {
    route: number;
    region: GameConstants.Region;
    subregion: number;
    town: TmpTownType;
    regionStarters: Array<KnockoutObservable<GameConstants.Starter>>;
    subregionObject: KnockoutObservable<SubRegion>;
    trainerId: string;
    itemList: Record<string, KnockoutObservable<number>>;
    _lastSeen: number;
    effectList: Record<string, KnockoutObservable<number>>;
    effectTimer: Record<string, KnockoutObservable<string>>;
    highestRegion: KnockoutObservable<GameConstants.Region>;
    highestSubRegion: KnockoutObservable<number>;
    amountOfItem: (itemName: string) => number;
    itemMultipliers: Record<string, number>;
    gainItem: (itemName: string, amount: number) => void;
    loseItem: (itemName: string, amount: number) => void;
    lowerItemMultipliers: (multiplierDecreaser: TmpMultiplierDecreaserType, amount?: number) => void;
    hasMegaStone: (megaStone: GameConstants.MegaStoneType) => boolean;
    gainMegaStone: (megaStone: GameConstants.MegaStoneType, notify?: boolean) => void;
    toJSON: () => Record<string, any>;
};

export type TmpBattleType = {
    enemyPokemon: KnockoutObservable<TmpBattlePokemonType | null>;
    counter: number;
    catching: KnockoutObservable<boolean>;
    catchRateActual: KnockoutObservable<number>;
    pokeball: KnockoutObservable<GameConstants.Pokeball>;
    lastPokemonAttack: number;
    lastClickAttack: number;
    route: number;
    tick: () => void;
    pokemonAttack: () => void;
    clickAttack: () => void;
    defeatPokemon: () => void;
    generateNewEnemy: () => void;
    catchPokemon: (enemyPokemon: TmpBattlePokemonType, route: number, region: GameConstants.Region) => void;
    gainItem: () => void;
    pokemonAttackTooltip: KnockoutComputed<string>;
};

export type TmpMapHelperType = {
    getUsableFilters: () => CssVariableSetting[];
    moveToRoute: (route: number, region: GameConstants.Region) => void;
    routeExist: (route: number, region: GameConstants.Region) => boolean;
    normalizeRoute: (route: number, region: GameConstants.Region) => number;
    accessToRoute: (route: number, region: GameConstants.Region) => boolean;
    getCurrentEnvironments: () => Array<GameConstants.Environment>;
    calculateBattleCssClass: () => string;
    calculateRouteCssClass: (route: number, region: GameConstants.Region) => string;
    isRouteCurrentLocation: (route: number, region: GameConstants.Region) => boolean;
    isTownCurrentLocation: (townName: string) => boolean;
    calculateTownCssClass: (townName: string) => string;
    accessToTown: (townName: string) => boolean;
    moveToTown: (townName: string) => void;
    validRoute: (route: number, region: GameConstants.Region) => boolean;
    openShipModal: () => void;
    ableToTravel: () => boolean;
    travelToNextRegion: () => void;
};

export type TmpDungeonRunnerType = {
    dungeon: {
        name: string
    };
};

export type TmpGymType = {
    town: string;
};

export type TmpGymRunnerType = {
    gymObservable: () => TmpGymType;
};

export type TmpAchievementHandlerType = {
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
    getAchievementCategories: () => AchievementCategory[];
    getAchievementCategoryByRegion: (region: GameConstants.Region) => AchievementCategory;
    getAchievementCategoryByExtraCategory: (category: GameConstants.ExtraAchievementCategories) => AchievementCategory;
    initialize: (multiplier: Multiplier, challenges: Challenges) => void;
    load: () => void;
};

export type TmpPokemonLocationsType = {
    getPokemonPrevolution: (pokemonName: PokemonNameType, maxRegion?: GameConstants.Region) => EvoData[];
};

export type TmpPokemonFactoryType = {
    generateShiny(chance: number, skipBonus?: boolean): boolean;
    generateGenderById(id: number): GameConstants.BattlePokemonGender;
};

export type TmpPartyControllerType = {
    getCaughtStatusByName: (name: PokemonNameType) => CaughtStatus;
    getPokerusStatusByName: (name: PokemonNameType) => GameConstants.Pokerus;
};

export type TmpSpecialEventsType = {
    getEvent: (eventName: SpecialEventTitleType) => any
};

export type TmpTemporaryBattleListType = {
    [battleName: string]: TmpTemporaryBattleType;
};

export type TmpTemporaryBattleType = {
    name: string;
    parent?: TmpTownType;
    getTown: () => TmpTownType | undefined;
    getDisplayName: () => string;
};

export type TmpTownType = {
    name: string;
};