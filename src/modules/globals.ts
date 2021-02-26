// importing only types, as we are "allowed" to have circular type dependencies
import type { Observable } from 'knockout';
import type LogBook from './logbook/LogBook';
import type BadgeCase from './DataStore/BadgeCase';
import type Profile from './profile/Profile';
import type Statistics from './DataStore/StatisticStore';
import type Challenges from './challenges/Challenges';
import type Multiplier from './multiplier/Multiplier';
import type { GameState } from './GameConstants';

// These types are only temporary while we are converting things to modules
// As things are converted, we should import their types here for use,
// instead of these cheap imitations.

type TmpGameType = {
    gameState: Observable<GameState>

    // constructor properties
    update: any,
    profile: Profile,
    breeding: any,
    pokeballs: any,
    wallet: any,
    keyItems: any,
    badgeCase: BadgeCase,
    oakItems: any,
    oakItemLoadouts: any,
    categories: any,
    party: any,
    shards: any,
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
    multiplier: Multiplier

    // There are functions we could mention too,
    // but they aren't mentioned in any modules (yet?)
};

type TmpAppType = {
    game: TmpGameType
};

// Where all the magic happens
declare global {
    const App: TmpAppType;

    const player: any;

    const pokemonMap: any;
}
