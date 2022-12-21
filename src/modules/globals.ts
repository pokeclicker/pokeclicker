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
    wallet: Wallet,
    keyItems: any,
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
    quests: any,
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

type TmpMapHelperType = {
    moveToRoute: (route: number, region: Region)=>void;
    routeExist: (route: number, region: Region)=>boolean;
    normalizeRoute: (route: number, region: Region)=>number;
    accessToRoute: (route: number, region: Region)=>boolean;
    getCurrentEnvironment: ()=>Environment;
    calculateBattleCssClass: ()=>string;
    calculateRouteCssClass: (route: number, region: Region)=>string;
    calculateTownCssClass: (townName: string)=>string;
    accessToTown: (townName: string)=>boolean;
    moveToTown: (townName: string)=>void;
    validRoute: (route: number, region: Region)=>boolean;
    openShipModal: ()=>void;
    ableToTravel: ()=>boolean;
    travelToNextRegion: ()=>void;
};

type TmpDungeonRunner = {
    dungeon: {
        name: string
    };
};

type TmpGym = {
    town: string;
};

type TmpGymRunner = {
    gymObservable: () => TmpGym;
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

// Where all the magic happens
declare global {
    const App: TmpAppType;
    const player: any;
    const Save: TmpSaveType;
    const MapHelper: TmpMapHelperType;
    const DungeonRunner: TmpDungeonRunner;
    const GymRunner: TmpGymRunner;
    const AchievementHandler: TmpAchievementHandler;
}
