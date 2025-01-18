import type { Observable as KnockoutObservable } from 'knockout';
import { ContestResults, ContestStyle } from '../../GameConstants';
import '../../koExtenders';
import type { PokemonList } from '../../pokemons/PokemonList';
import { Saveable } from '../common/Saveable';
import getRouteKillsProxy from './getRouteKillsProxy';

const failedSetValue = () => 0;

type PokemonID = PokemonList[number]['id'];
type PokemonStats = Record<PokemonID, KnockoutObservable<number>> & { highestID: PokemonID };

export default class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults: Record<string, any> = {};

    selectedPokemonID = ko.observable(1);

    selectedBerryID = ko.observable(0).extend({ numeric: 0 });

    /*
     * observables
     */
    // Other
    secondsPlayed: KnockoutObservable<number>;
    clickAttacks: KnockoutObservable<number>;
    questsCompleted: KnockoutObservable<number>;
    totalGemsGained: KnockoutObservable<number>;
    totalVitaminsPurchased: KnockoutObservable<number>;
    totalVitaminsObtained: KnockoutObservable<number>;
    // Currency
    totalMoney: KnockoutObservable<number>;
    totalDungeonTokens: KnockoutObservable<number>;
    totalQuestPoints: KnockoutObservable<number>;
    totalDiamonds: KnockoutObservable<number>;
    totalFarmPoints: KnockoutObservable<number>;
    totalBattlePoints: KnockoutObservable<number>;
    totalContestTokens: KnockoutObservable<number>;
    // Pokemon
    totalPokemonCaptured: KnockoutObservable<number>;
    totalPokemonDefeated: KnockoutObservable<number>;
    totalPokemonEncountered: KnockoutObservable<number>;
    totalPokemonHatched: KnockoutObservable<number>;
    totalShinyPokemonCaptured: KnockoutObservable<number>;
    totalShinyPokemonDefeated: KnockoutObservable<number>;
    totalShinyPokemonEncountered: KnockoutObservable<number>;
    totalShinyPokemonHatched: KnockoutObservable<number>;

    totalMalePokemonCaptured: KnockoutObservable<number>;
    totalMalePokemonDefeated: KnockoutObservable<number>;
    totalMalePokemonEncountered: KnockoutObservable<number>;
    totalMalePokemonHatched: KnockoutObservable<number>;
    totalFemalePokemonCaptured: KnockoutObservable<number>;
    totalFemalePokemonDefeated: KnockoutObservable<number>;
    totalFemalePokemonEncountered: KnockoutObservable<number>;
    totalFemalePokemonHatched: KnockoutObservable<number>;
    totalGenderlessPokemonCaptured: KnockoutObservable<number>;
    totalGenderlessPokemonDefeated: KnockoutObservable<number>;
    totalGenderlessPokemonEncountered: KnockoutObservable<number>;
    totalGenderlessPokemonHatched: KnockoutObservable<number>;

    totalShinyMalePokemonCaptured: KnockoutObservable<number>;
    totalShinyMalePokemonDefeated: KnockoutObservable<number>;
    totalShinyMalePokemonEncountered: KnockoutObservable<number>;
    totalShinyMalePokemonHatched: KnockoutObservable<number>;
    totalShinyFemalePokemonCaptured: KnockoutObservable<number>;
    totalShinyFemalePokemonDefeated: KnockoutObservable<number>;
    totalShinyFemalePokemonEncountered: KnockoutObservable<number>;
    totalShinyFemalePokemonHatched: KnockoutObservable<number>;
    totalShinyGenderlessPokemonCaptured: KnockoutObservable<number>;
    totalShinyGenderlessPokemonDefeated: KnockoutObservable<number>;
    totalShinyGenderlessPokemonEncountered: KnockoutObservable<number>;
    totalShinyGenderlessPokemonHatched: KnockoutObservable<number>;

    totalShadowPokemonCaptured: KnockoutObservable<number>;
    totalShadowPokemonDefeated: KnockoutObservable<number>;

    totalShadowMalePokemonCaptured: KnockoutObservable<number>;
    totalShadowMalePokemonDefeated: KnockoutObservable<number>;
    totalShadowFemalePokemonCaptured: KnockoutObservable<number>;
    totalShadowFemalePokemonDefeated: KnockoutObservable<number>;
    totalShadowGenderlessPokemonCaptured: KnockoutObservable<number>;
    totalShadowGenderlessPokemonDefeated: KnockoutObservable<number>;
    // Underground
    undergroundItemsFound: KnockoutObservable<number>;
    undergroundLayersMined: KnockoutObservable<number>;
    undergroundDailyDealTrades: KnockoutObservable<number>;
    undergroundToolsUsed: Record<string, KnockoutObservable<number>>;
    // Farm
    totalManualHarvests: KnockoutObservable<number>;
    totalBerriesObtained: KnockoutObservable<number>;
    totalBerriesHarvested: KnockoutObservable<number>;
    totalBerriesReplanted: KnockoutObservable<number>;
    totalBerriesMutated: KnockoutObservable<number>;
    totalMulchesUsed: KnockoutObservable<number>;
    totalShovelsUsed: KnockoutObservable<number>;
    berryDailyDealTrades: KnockoutObservable<number>;
    // Battle Frontier
    battleFrontierTotalStagesCompleted: KnockoutObservable<number>;
    battleFrontierHighestStageCompleted: KnockoutObservable<number>;
    // Safari Zone
    safariTimesEntered: KnockoutObservable<number>;
    safariRocksThrown: KnockoutObservable<number>;
    safariBaitThrown: KnockoutObservable<number>;
    safariBallsThrown: KnockoutObservable<number>;
    safariPokemonCaptured: KnockoutObservable<number>;
    safariShinyPokemonCaptured: KnockoutObservable<number>;
    safariStepsTaken: KnockoutObservable<number>;
    safariItemsObtained: KnockoutObservable<number>;

    /*
     * arrayObservables
     */
    pokeballsUsed: Array<KnockoutObservable<number>>;
    pokeballsPurchased: Array<KnockoutObservable<number>>;
    pokeballsObtained: Array<KnockoutObservable<number>>;
    // Other
    gemsGained: Array<KnockoutObservable<number>>;
    oakItemUses: Array<KnockoutObservable<number>>;
    // Farm
    berriesHarvested: Array<KnockoutObservable<number>>;
    berriesObtained: KnockoutObservable<number>;
    mulchesUsed: Array<KnockoutObservable<number>>;
    // Battle
    routeKills: Record<string, Record<string, KnockoutObservable<number>>>;
    gymsDefeated: Array<KnockoutObservable<number>>;
    dungeonsCleared: Array<KnockoutObservable<number>>;
    temporaryBattleDefeated: Array<KnockoutObservable<number>>;
    // Contests
    contestResults: Record<ContestResults, KnockoutObservable<number>>;
    contestStyleMaster: Record<ContestStyle, KnockoutObservable<number>>;
    // DungeonGuides
    dungeonGuideAttempts: Array<KnockoutObservable<number>>;
    dungeonGuideClears: Array<KnockoutObservable<number>>;

    /*
     * objectObservables
     */
    pokemonCaptured: PokemonStats;
    pokemonDefeated: PokemonStats;
    pokemonSeen: PokemonStats;
    pokemonEncountered: PokemonStats;
    pokemonHatched: PokemonStats;
    shinyPokemonCaptured: PokemonStats;
    shinyPokemonDefeated: PokemonStats;
    shinyPokemonEncountered: PokemonStats;
    shinyPokemonHatched: PokemonStats;
    malePokemonCaptured: PokemonStats;
    malePokemonDefeated: PokemonStats;
    malePokemonEncountered: PokemonStats;
    malePokemonHatched: PokemonStats;
    femalePokemonCaptured: PokemonStats;
    femalePokemonDefeated: PokemonStats;
    femalePokemonEncountered: PokemonStats;
    femalePokemonHatched: PokemonStats;
    shinyMalePokemonCaptured: PokemonStats;
    shinyFemalePokemonCaptured: PokemonStats;
    shinyMalePokemonDefeated: PokemonStats;
    shinyFemalePokemonDefeated: PokemonStats;
    shinyMalePokemonEncountered: PokemonStats;
    shinyFemalePokemonEncountered: PokemonStats;
    shinyMalePokemonHatched: PokemonStats;
    shinyFemalePokemonHatched: PokemonStats;
    shadowPokemonCaptured: PokemonStats;
    shadowPokemonDefeated: PokemonStats;
    shadowMalePokemonCaptured: PokemonStats;
    shadowFemalePokemonCaptured: PokemonStats;
    shadowMalePokemonDefeated: PokemonStats;
    shadowFemalePokemonDefeated: PokemonStats;
    npcTalkedTo: Record<string, KnockoutObservable<number>>;

    observables = [
        'secondsPlayed',
        'clickAttacks',
        'questsCompleted',
        'totalGemsGained',
        'totalVitaminsPurchased',
        'totalVitaminsObtained',
        'totalMoney',
        'totalDungeonTokens',
        'totalQuestPoints',
        'totalDiamonds',
        'totalFarmPoints',
        'totalBattlePoints',
        'totalContestTokens',
        'totalPokemonCaptured',
        'totalPokemonDefeated',
        'totalPokemonEncountered',
        'totalPokemonHatched',
        'totalShinyPokemonCaptured',
        'totalShinyPokemonDefeated',
        'totalShinyPokemonEncountered',
        'totalShinyPokemonHatched',
        'totalMalePokemonCaptured',
        'totalMalePokemonDefeated',
        'totalMalePokemonEncountered',
        'totalMalePokemonHatched',
        'totalFemalePokemonCaptured',
        'totalFemalePokemonDefeated',
        'totalFemalePokemonEncountered',
        'totalFemalePokemonHatched',
        'totalGenderlessPokemonCaptured',
        'totalGenderlessPokemonDefeated',
        'totalGenderlessPokemonEncountered',
        'totalGenderlessPokemonHatched',
        'totalShinyMalePokemonCaptured',
        'totalShinyMalePokemonDefeated',
        'totalShinyMalePokemonEncountered',
        'totalShinyMalePokemonHatched',
        'totalShinyFemalePokemonCaptured',
        'totalShinyFemalePokemonDefeated',
        'totalShinyFemalePokemonEncountered',
        'totalShinyFemalePokemonHatched',
        'totalShinyGenderlessPokemonCaptured',
        'totalShinyGenderlessPokemonDefeated',
        'totalShinyGenderlessPokemonEncountered',
        'totalShinyGenderlessPokemonHatched',
        'totalShadowPokemonCaptured',
        'totalShadowPokemonDefeated',
        'totalShadowMalePokemonCaptured',
        'totalShadowMalePokemonDefeated',
        'totalShadowFemalePokemonCaptured',
        'totalShadowFemalePokemonDefeated',
        'totalShadowGenderlessPokemonCaptured',
        'totalShadowGenderlessPokemonDefeated',
        'undergroundItemsFound',
        'undergroundLayersMined',
        'undergroundDailyDealTrades',
        'totalManualHarvests',
        'totalBerriesHarvested',
        'totalBerriesObtained',
        'totalBerriesReplanted',
        'totalBerriesMutated',
        'totalMulchesUsed',
        'totalShovelsUsed',
        'berryDailyDealTrades',
        'battleFrontierTotalStagesCompleted',
        'battleFrontierHighestStageCompleted',
        'safariTimesEntered',
        'safariRocksThrown',
        'safariBaitThrown',
        'safariBallsThrown',
        'safariPokemonCaptured',
        'safariShinyPokemonCaptured',
        'safariStepsTaken',
        'safariItemsObtained',
    ];
    arrayObservables = [
        'gymsDefeated',
        'dungeonsCleared',
        'pokeballsUsed',
        'pokeballsPurchased',
        'pokeballsObtained',
        'gemsGained',
        'oakItemUses',
        'berriesHarvested',
        'berriesObtained',
        'mulchesUsed',
        'temporaryBattleDefeated',
        'contestResults',
        'contestStyleMaster',
        'dungeonGuideAttempts',
        'dungeonGuideClears',
    ];
    // These will allow negative values (special events etc)
    objectObservables = [
        'pokemonCaptured',
        'pokemonDefeated',
        'pokemonSeen',
        'pokemonEncountered',
        'pokemonHatched',
        'shinyPokemonCaptured',
        'shinyPokemonDefeated',
        'shinyPokemonEncountered',
        'shinyPokemonHatched',
        'malePokemonCaptured',
        'malePokemonDefeated',
        'malePokemonEncountered',
        'malePokemonHatched',
        'femalePokemonCaptured',
        'femalePokemonDefeated',
        'femalePokemonEncountered',
        'femalePokemonHatched',
        'shinyMalePokemonCaptured',
        'shinyFemalePokemonCaptured',
        'shinyMalePokemonDefeated',
        'shinyFemalePokemonDefeated',
        'shinyMalePokemonEncountered',
        'shinyFemalePokemonEncountered',
        'shinyMalePokemonHatched',
        'shinyFemalePokemonHatched',
        'shadowPokemonCaptured',
        'shadowPokemonDefeated',
        'shadowMalePokemonCaptured',
        'shadowFemalePokemonCaptured',
        'shadowMalePokemonDefeated',
        'shadowFemalePokemonDefeated',
        'npcTalkedTo',
        'undergroundToolsUsed',
    ];
    // Observables that can be automatically generated
    autogeneratedObservables = [
        'routeKills',
    ];

    constructor() {
        this.observables.forEach((prop) => {
            this[prop] = ko.observable<number>(0).extend({ numeric: 0 });
        });

        this.arrayObservables.forEach((array) => {
            // We use a proxy to generate new array observables on the fly.
            this[array] = new Proxy([], {
                get: (statistics, prop: string) => {
                    if (typeof statistics[prop] !== 'undefined') {
                        return statistics[prop];
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = Math.floor(Number(prop));
                    if (Number.isNaN(id) || id < 0 || id !== Number(prop)) {
                        if (Number.isNaN(id)) {
                            // eslint-disable-next-line no-console
                            console.trace(`[Statistics] [${array}] Invalid property requested:`, prop);
                        }
                        return failedSetValue;
                    }

                    // eslint-disable-next-line no-param-reassign
                    statistics[id] = ko.observable<number>(0).extend({ numeric: 0 });
                    return statistics[id];
                },

                // This makes it so the stats observable can't be accidently changed
                set: (
                    obj: Array<KnockoutObservable<number>>,
                    prop: any,
                    value: number,
                ): boolean => {
                    const result = obj[prop](value);
                    return result === failedSetValue;
                },

                // This is needed for map, forEach etc to work,
                // because they want to check if target.hasOwnProperty("0") first.
                // The ko function doesn't seem to have any OwnProperties anyway,
                // so no harm here (don't quote me)
                // eslint-disable-next-line func-names
                has: (target: any, prop: string) => Reflect.has(target, prop),
            });
        });

        this.objectObservables.forEach((object) => {
            this[object] = new Proxy({}, {
                get: (statistics, prop: string) => {
                    if (typeof statistics[prop] !== 'undefined') {
                        return statistics[prop];
                    }

                    if (prop === 'highestID') {
                        let highestID = 0;
                        Object.entries(statistics).forEach(([key, val]: [string, () => number]) => {
                            const numKey = Number(key);
                            if (!Number.isNaN(numKey) && numKey > highestID && val() > 0) {
                                highestID = numKey;
                            }
                        });
                        return highestID;
                    }

                    // If it's not an int, we do not want to set it
                    const id = Number(prop);
                    if (Number.isNaN(id)) {
                        // eslint-disable-next-line no-console
                        console.trace(`[Statistics] [${object}] Invalid property requested:`, prop);
                        return () => 0;
                    }

                    // eslint-disable-next-line no-param-reassign
                    statistics[id] = ko.observable<number>(0).extend({ numeric: 0 });
                    return statistics[id];
                },

                // This makes it so the stats observable can't be accidently changed
                set: (obj: any, prop: any, value: number): boolean => {
                    const result = obj[prop](value);
                    return result === failedSetValue;
                },

                // This is needed for map, forEach etc to work,
                // because they want to check if target.hasOwnProperty("0") first.
                // The ko function doesn't seem to have any OwnProperties anyway,
                // so no harm here (don't quote me)
                // eslint-disable-next-line func-names
                has: (target: any, prop: string) => Reflect.has(target, prop),
            });
        });

        // We use a proxy to generate new array observables on the fly.
        this.routeKills = getRouteKillsProxy();
    }

    toJSON(): Record<string, any> {
        const saveObject = {};

        const getSaveDataValue = (rawInput) => {
            // Unwrap the value immediately, so we are always working with JS types
            const input = ko.unwrap(rawInput);

            if (Array.isArray(input)) {
                // Recurse arrays through getSaveDataValue, to get any observable values
                return input.map(getSaveDataValue);
            }

            if (typeof input === 'object' && !ko.isObservable(input)) {
                // Recurse objects through getSaveDataValue, to get any observable values
                return Object.entries(input).reduce((acc, [nextKey, nextObs]) => {
                    const nextValue = getSaveDataValue(nextObs);
                    if (nextValue === 0) {
                        return acc;
                    }
                    acc[nextKey] = nextValue;
                    return acc;
                }, {});
            }

            // If we get here, it isn't an array or object, so it must be a value.
            return input;
        };

        // Since we're able to flatten arrays/objects/values with a single function,
        // process all of them together
        [].concat(
            this.observables,
            this.arrayObservables,
            this.objectObservables,
            this.autogeneratedObservables,
        ).forEach((prop) => { saveObject[prop] = getSaveDataValue(this[prop]); });

        return saveObject;
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        this.observables.forEach((prop) => { this[prop](json[prop] || 0); });

        this.arrayObservables.forEach((array) => {
            json[array]?.forEach((el, index) => {
                if (this[array] && this[array][index] && !Number.isNaN(Number(el))) {
                    this[array][index](Number(el));
                }
            });
        });

        this.objectObservables.forEach((object) => {
            if (!json[object]) { return; }

            Object.entries(json[object]).forEach(([key, val]) => {
                const num = Number(val);
                if (!Number.isNaN(num) && num) {
                    this[object][key](num);
                }
            });
        });

        const setAutogeneratedObservable = (objSet, objGet, key) => {
            // Don't try to process a null value. We should retain the defaults
            if (objGet[key] === null) {
                return;
            }

            if (typeof objSet[key] === 'undefined') {
                // Skip any values that are not allowed to be set
                // eslint-disable-next-line no-console
                console.trace('[Statistics] Could not set:', key);
            } else if (Array.isArray(objGet[key])) {
                // If we've found an array, loop into it
                for (let i = 0; i < objGet[key].length; i += 1) {
                    setAutogeneratedObservable(objSet[key], objGet[key], i);
                }
            } else if (typeof objGet[key] === 'object') {
                // If we've found an object, nest into it
                Object.keys(objGet[key]).forEach((nestedKey) => {
                    setAutogeneratedObservable(objSet[key], objGet[key], nestedKey);
                });
            } else if (ko.isObservable(objSet[key])) {
                // If we've found an observable, set it
                objSet[key](objGet[key]);
            } else {
                // eslint-disable-next-line no-console
                console.trace('[Statistics] Could not determine action to take for set:', key);
            }
        };
        this.autogeneratedObservables.forEach((object) => {
            if (!json[object]) { return; }
            setAutogeneratedObservable(this, json, object);
        });
    }
}
