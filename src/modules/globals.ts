// importing only types, as we are "allowed" to have circular type dependencies
import type LogBook from './logbook/LogBook';
import type BadgeCase from './DataStore/BadgeCase';
import type Profile from './profile/Profile';
import type Statistics from './DataStore/StatisticStore';
import type Challenges from './challenges/Challenges';
import type Multiplier from './multiplier/Multiplier';
import type { Environment, GameState, Region } from './GameConstants';
import type PokemonType from './enums/PokemonType';
import type BagItem from './interfaces/BagItem';
import type LevelType from './party/LevelType';
import type Wallet from './wallet/Wallet';
import { PokemonNameType } from './pokemons/PokemonNameType';
import PokemonCategories from './party/Category';
import OakItems from './oakItems/OakItems';
import OakItemLoadouts from './oakItems/OakItemLoadouts';
import SaveReminder from './saveReminder/SaveReminder';
import Translate from './translation/Translation';

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
    translation: Translate,
    start: ()=>void
};

type TmpPokemonListData = {
    id: number;
    name: PokemonNameType;
    nativeRegion?: Region;
    catchRate: number;
    evolutions?: any[]; // No Evolutions in modules yet :(
    type: PokemonType[];
    base: {
        hitpoints: number;
        attack: number;
        specialAttack: number;
        defense: number;
        specialDefense: number;
        speed: number;
    };
    levelType: LevelType;
    exp: number;
    eggCycles: number;
    baby?: boolean;
    attack?: number;
    heldItem?: BagItem;
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

type TmpPokemonMapProxy
    = Record<PokemonNameType | number, TmpPokemonListData>
    & {
        random: (max?: number, min?: number) => TmpPokemonListData,
        randomRegion: (max?: Region, min?: Region) => TmpPokemonListData,
    }
    & Array<TmpPokemonListData>;

// Where all the magic happens
declare global {
    const App: TmpAppType;
    const pokemonMap: TmpPokemonMapProxy;
    const player: any;
    const Save: TmpSaveType;
    const MapHelper: TmpMapHelperType;
}
