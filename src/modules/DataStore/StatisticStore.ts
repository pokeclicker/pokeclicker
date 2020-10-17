import { Observable as KnockoutObservable } from 'knockout';
import { Saveable } from './common/Saveable';
import '../koExtenders';

const failedSetValue = () => 0;

export default class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults = {};

    selectedPokemonID = ko.observable(1).extend({ numeric: 0 });

    selectedBerryID = ko.observable(0).extend({ numeric: 0 });

    /*
     * observables
     */
    // Other
    secondsPlayed: KnockoutObservable<number>;
    clickAttacks: KnockoutObservable<number>;
    questsCompleted: KnockoutObservable<number>;
    totalShardsGained: KnockoutObservable<number>;
    // Currency
    totalMoney: KnockoutObservable<number>;
    totalDungeonTokens: KnockoutObservable<number>;
    totalQuestPoints: KnockoutObservable<number>;
    totalDiamonds: KnockoutObservable<number>;
    totalFarmPoints: KnockoutObservable<number>;
    totalBattlePoints: KnockoutObservable<number>;
    // Pokemon
    totalPokemonCaptured: KnockoutObservable<number>;
    totalPokemonDefeated: KnockoutObservable<number>;
    totalPokemonEncountered: KnockoutObservable<number>;
    totalPokemonHatched: KnockoutObservable<number>;
    totalShinyPokemonCaptured: KnockoutObservable<number>;
    totalShinyPokemonDefeated: KnockoutObservable<number>;
    totalShinyPokemonEncountered: KnockoutObservable<number>;
    totalShinyPokemonHatched: KnockoutObservable<number>;
    // Underground
    undergroundItemsFound: KnockoutObservable<number>;
    undergroundLayersMined: KnockoutObservable<number>;
    undergroundDailyDealTrades: KnockoutObservable<number>;
    // Farm
    totalBerriesHarvested: KnockoutObservable<number>;
    // Battle Frontier
    battleFrontierTotalStagesCompleted: KnockoutObservable<number>;
    battleFrontierHighestStageCompleted: KnockoutObservable<number>;

    /*
     * arrayObservables
     */
    pokeballsUsed: Array<KnockoutObservable<number>>;
    pokeballsBought: Array<KnockoutObservable<number>>;
    // Other
    shardsGained: Array<KnockoutObservable<number>>;
    oakItemUses: Array<KnockoutObservable<number>>;
    // Farm
    berriesHarvested: Array<KnockoutObservable<number>>;
    // Battle
    routeKills: Array<KnockoutObservable<number>>;
    gymsDefeated: Array<KnockoutObservable<number>>;
    dungeonsCleared: Array<KnockoutObservable<number>>;

    /*
     * objectObservables
     */
    pokemonCaptured: any;
    pokemonDefeated: any;
    pokemonEncountered: any;
    pokemonHatched: any;
    shinyPokemonCaptured: any;
    shinyPokemonDefeated: any;
    shinyPokemonEncountered: any;
    shinyPokemonHatched: any;

    observables = [
        'secondsPlayed',
        'clickAttacks',
        'questsCompleted',
        'totalShardsGained',
        'totalMoney',
        'totalDungeonTokens',
        'totalQuestPoints',
        'totalDiamonds',
        'totalFarmPoints',
        'totalBattlePoints',
        'totalPokemonCaptured',
        'totalPokemonDefeated',
        'totalPokemonEncountered',
        'totalPokemonHatched',
        'totalShinyPokemonCaptured',
        'totalShinyPokemonDefeated',
        'totalShinyPokemonEncountered',
        'totalShinyPokemonHatched',
        'undergroundItemsFound',
        'undergroundLayersMined',
        'undergroundDailyDealTrades',
        'totalBerriesHarvested',
        'battleFrontierTotalStagesCompleted',
        'battleFrontierHighestStageCompleted',
    ];
    arrayObservables = [
        'gymsDefeated',
        'dungeonsCleared',
        'pokeballsUsed',
        'pokeballsBought',
        'shardsGained',
        'oakItemUses',
        'berriesHarvested',
        'routeKills',
    ];
    // These will allow negative values (special events etc)
    objectObservables = [
        'pokemonCaptured',
        'pokemonDefeated',
        'pokemonEncountered',
        'pokemonHatched',
        'shinyPokemonCaptured',
        'shinyPokemonDefeated',
        'shinyPokemonEncountered',
        'shinyPokemonHatched',
    ];

    constructor() {
        this.observables.forEach((prop) => {
            this[prop] = ko.observable<number>(0).extend({ numeric: 0 });
        });

        this.arrayObservables.forEach((array) => {
            // We use a proxy to generate new array observables on the fly.
            this[array] = new Proxy([], {
                get: (statistics, prop: string) => {
                    if (statistics[prop]) {
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
                    prop: number,
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
                    if (statistics[prop]) {
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

                    // If it's not an int or less than zero, we do not want to set it
                    const id = Number(prop);
                    if (Number.isNaN(id)) {
                        // eslint-disable-next-line no-console
                        console.trace(`[Statistics] [${object}] Invalid property requested:`, prop);
                        return () => 0;
                    }

                    return (val) => {
                        if (!Number.isNaN(Number(val))) {
                            // eslint-disable-next-line no-param-reassign
                            statistics[prop] = ko.observable<number>(val).extend({ numeric: 0 });
                            return val;
                        } return 0;
                    };
                },

                // This makes it so the stats observable can't be accidently changed
                set: (obj: any, prop: number, value: number): boolean => {
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
    }

    toJSON(): Record<string, any> {
        const saveObject = {};

        this.observables.forEach((prop) => { saveObject[prop] = this[prop](); });

        this.arrayObservables.forEach((array) => {
            saveObject[array] = this[array].map((x) => x());
        });

        this.objectObservables.forEach((object) => {
            saveObject[object] = {};
            Object.entries(this[object])
                .forEach(([key, val]: [string, KnockoutObservable<number>]) => {
                    saveObject[object][key] = val();
                });
        });

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
    }
}
