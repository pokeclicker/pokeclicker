import { Saveable } from './common/Saveable';

export default class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults = {};

    selectedPokemonID = ko.observable(1);

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
            this[prop] = ko.observable(0).extend({ numeric: 0 });
        });

        this.arrayObservables.forEach((array) => {
            this[array] = new Proxy([ko.observable(0).extend({ numeric: 0 })], {
                get: (statistics, prop: string) => {
                    if (statistics[prop]) {
                        return statistics[prop];
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = Math.floor(+prop);
                    if (Number.isNaN(id) || id < 0 || id !== +prop) {
                        if (Number.isNaN(id)) {
                            // eslint-disable-next-line no-console
                            console.trace(`[Statistics] [${array}] Invalid property requested:`, prop);
                        }
                        return () => 0;
                    }

                    // TODO: A `get` function shouldn't be mutating and argument
                    // eslint-disable-next-line no-param-reassign
                    statistics[id] = ko.observable(0).extend({ numeric: 0 });
                    return statistics[id];
                },

                // TODO: fixup typescript errors
                // This makes it so the stats observable can't be accidently changed
                // set: () => {},

                // This is needed for map, forEach etc to work,
                // because they want to check if target.hasOwnProperty("0") first.
                // The ko function doesn't seem to have any OwnProperties anyway,
                // so no harm here (don't quote me)
                // TODO: Figure out where this is being called from and fix the naming
                // eslint-disable-next-line func-names
                has: (target: any, prop: string) => Reflect.has(target, prop),
            });
        });

        this.objectObservables.forEach((object) => {
            this[object] = new Proxy({ 0: ko.observable(0).extend({ numeric: 0 }) }, {
                get: (statistics, prop: string) => {
                    if (statistics[prop]) {
                        return statistics[prop];
                    }

                    if (prop === 'highestID') {
                        let highestID = 0;
                        Object.entries(statistics).forEach(([key, val]: [string, () => number]) => {
                            if (!Number.isNaN(+key) && +key > highestID && val() > 0) {
                                highestID = +key;
                            }
                        });
                        return highestID;
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = +prop;
                    if (Number.isNaN(id)) {
                        // eslint-disable-next-line no-console
                        console.trace(`[Statistics] [${object}] Invalid property requested:`, prop);
                        return () => 0;
                    }

                    return (val) => {
                        if (!Number.isNaN(+val)) {
                            // TODO: A `get` function shouldn't be mutating and argument
                            // eslint-disable-next-line no-param-reassign
                            statistics[prop] = ko.observable(val).extend({ numeric: 0 });
                            return val;
                        } return 0;
                    };
                },

                // TODO: fixup typescript errors
                // This makes it so the stats observable can't be accidently changed
                // set: () => {},

                // This is needed for map, forEach etc to work,
                // because they want to check if target.hasOwnProperty("0") first.
                // The ko function doesn't seem to have any OwnProperties anyway,
                // so no harm here (don't quote me)
                // TODO: Figure out where this is being called from and fix the naming
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
                if (this[array] && this[array][index] && +el) {
                    this[array][index](+el);
                }
            });
        });

        this.objectObservables.forEach((object) => {
            if (!json[object]) { return; }

            Object.entries(json[object]).forEach(([key, val]) => {
                const num = +val;
                if (!Number.isNaN(num) && num) {
                    this[object][key](num);
                }
            });
        });
    }
}
