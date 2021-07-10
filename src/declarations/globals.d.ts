/// <reference path="./logbook/LogBook.d.ts"/>
/// <reference path="./DataStore/BadgeCase.d.ts"/>
/// <reference path="./profile/Profile.d.ts"/>
/// <reference path="./DataStore/StatisticStore.d.ts"/>
/// <reference path="./challenges/Challenges.d.ts"/>
/// <reference path="./multiplier/Multiplier.d.ts"/>
/// <reference path="./GameConstants.d.ts"/>
/// <reference path="./enums/PokemonType.d.ts"/>
/// <reference path="./interfaces/BagItem.d.ts"/>
/// <reference path="./party/LevelType.d.ts"/>
/// <reference path="./wallet/Wallet.d.ts"/>
/// <reference path="./pokemons/PokemonNameType.d.ts"/>
declare type TmpGameType = {
    gameState: GameState;
    update: any;
    profile: Profile;
    breeding: any;
    pokeballs: any;
    wallet: Wallet;
    keyItems: any;
    badgeCase: BadgeCase;
    oakItems: any;
    oakItemLoadouts: any;
    categories: any;
    party: any;
    shards: any;
    underground: any;
    farming: any;
    logbook: LogBook;
    redeemableCodes: any;
    statistics: Statistics;
    quests: any;
    specialEvents: any;
    discord: any;
    achievementTracker: any;
    challenges: Challenges;
    multiplier: Multiplier;
};
declare type TmpAppType = {
    game: TmpGameType;
};
declare type TmpPokemonListData = {
    id: number;
    name: PokemonNameType;
    nativeRegion?: Region;
    catchRate: number;
    evolutions?: any[];
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
declare type TmpPokemonMapProxy = Record<PokemonNameType | number, TmpPokemonListData> & {
    random: (max?: number, min?: number) => TmpPokemonListData;
    randomRegion: (max?: Region, min?: Region) => TmpPokemonListData;
} & Array<TmpPokemonListData>;
declare global {
    const App: TmpAppType;
    const pokemonMap: TmpPokemonMapProxy;
    const player: any;
}

