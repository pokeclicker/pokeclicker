///<reference path="../oakItems/OakItems.ts"/>
///<reference path="../farming/BerryType.ts"/>
///<reference path="../pokemons/PokemonType.ts"/>
class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults = {};

    selectedPokemonID = ko.observable(1);

    // observables
    clickAttacks: KnockoutObservable<number>;
    totalPokemonCaptured: KnockoutObservable<number>;
    totalPokemonDefeated: KnockoutObservable<number>;
    totalPokemonEncountered: KnockoutObservable<number>;
    totalPokemonHatched: KnockoutObservable<number>;
    totalShinyPokemonCaptured: KnockoutObservable<number>;
    totalShinyPokemonDefeated: KnockoutObservable<number>;
    totalShinyPokemonEncountered: KnockoutObservable<number>;
    totalShinyPokemonHatched: KnockoutObservable<number>;
    undergroundItemsFound: KnockoutObservable<number>; // Total treasure found in underground
    undergroundLayersMined: KnockoutObservable<number>; // Total underground layers completed
    totalMoney: KnockoutObservable<number>;
    totalDungeonTokens: KnockoutObservable<number>;
    totalQuestPoints: KnockoutObservable<number>;
    totalDiamonds: KnockoutObservable<number>;
    totalFarmPoints: KnockoutObservable<number>;
    // arrayObservables
    pokeballsUsed: Array<KnockoutObservable<number>>;
    pokeballsBought: Array<KnockoutObservable<number>>;
    totalShards: Array<KnockoutObservable<number>>;
    oakItemUses: Array<KnockoutObservable<number>>;
    berriesHarvested: Array<KnockoutObservable<number>>;
    routeKills: Array<KnockoutObservable<number>>;
    gymsDefeated: Array<KnockoutObservable<number>>;
    dungeonsCleared: Array<KnockoutObservable<number>>;
    // objectObservables
    pokemonCaptured: any;
    pokemonDefeated: any;
    pokemonEncountered: any;
    shinyPokemonCaptured: any;
    shinyPokemonDefeated: any;
    shinyPokemonEncountered: any;

    observables = [
        'clickAttacks',
        'undergroundItemsFound',
        'undergroundLayersMined',
        'totalMoney',
        'totalDungeonTokens',
        'totalQuestPoints',
        'totalDiamonds',
        'totalFarmPoints',
        'totalPokemonCaptured',
        'totalPokemonDefeated',
        'totalPokemonEncountered',
        'totalPokemonHatched',
        'totalShinyPokemonCaptured',
        'totalShinyPokemonDefeated',
        'totalShinyPokemonEncountered',
        'totalShinyPokemonHatched',
    ];
    arrayObservables = [
        'gymsDefeated',
        'dungeonsCleared',
        'pokeballsUsed',
        'pokeballsBought',
        'totalShards',
        'oakItemUses',
        'berriesHarvested',
        'routeKills',
    ];
    // These will allow negative values (special events etc)
    objectObservables = [
        'pokemonCaptured',
        'pokemonDefeated',
        'pokemonEncountered',
        'shinyPokemonCaptured',
        'shinyPokemonDefeated',
        'shinyPokemonEncountered',
    ]

    constructor() {
        for (const prop of this.observables) {
            this[prop] = ko.observable(0).extend({ numeric: 0 });
        }

        for (const array of this.arrayObservables) {
            this[array] = new Proxy([ko.observable(0).extend({ numeric: 0 })], {
                get: (statistics, prop: string) => {
                    if (statistics[prop]) {
                        return statistics[prop];
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = Math.floor(+prop);
                    if (isNaN(id) || id < 0 || id != +prop) {
                        if (isNaN(id)) {
                            console.trace(`[Statistics] [${array}] Invalid property requested:`, prop);
                        }
                        return () => 0;
                    }
                    statistics[id] = ko.observable(0).extend({ numeric: 0 });
                    return statistics[id];
                },

                // TODO: fixup typescript errors
                // This makes it so the stats observable can't be accidently changed
                // set: () => {},

                has: function (target: any, prop: string) {
                    // This is needed for map, forEach etc to work,
                    // because they want to check if target.hasOwnProperty("0") first.
                    // The ko function doesn't seem to have any OwnProperties anyway, so no harm here (don't quote me)
                    return Reflect.has(target, prop);
                },
            });
        }

        for (const array of this.objectObservables) {
            this[array] = new Proxy({0: ko.observable(0).extend({ numeric: 0 })}, {
                get: (statistics, prop: string) => {
                    if (statistics[prop]) {
                        return statistics[prop];
                    }

                    switch (prop) {
                        case 'highestID':
                            let highestID = 0;
                            Object.entries(statistics).forEach(([key, val]) => {
                                if (!isNaN(+key) && +key > highestID && val() > 0) {
                                    highestID = +key;
                                }
                            });
                            return highestID;
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = +prop;
                    if (isNaN(id)) {
                        console.trace(`[Statistics] [${array}] Invalid property requested:`, prop);
                        return () => 0;
                    }

                    return (val) => {
                        if (!isNaN(+val)) {
                            statistics[prop] = ko.observable(val).extend({ numeric: 0 }); return val;
                        } return 0;
                    };
                },

                // TODO: fixup typescript errors
                // This makes it so the stats observable can't be accidently changed
                // set: () => {},

                has: function (target: any, prop: string) {
                    // This is needed for map, forEach etc to work,
                    // because they want to check if target.hasOwnProperty("0") first.
                    // The ko function doesn't seem to have any OwnProperties anyway, so no harm here (don't quote me)
                    return Reflect.has(target, prop);
                },
            });
        }
    }

    public static getGymIndex(gym: string) {
        return GameConstants.RegionGyms.flat().findIndex(g => g == gym);
    }

    public static getDungeonIndex(dungeon: string) {
        return GameConstants.RegionDungeons.flat().findIndex(d => d == dungeon);
    }

    toJSON(): Record<string, any> {
        const saveObject = {};

        for (const prop of this.observables) {
            saveObject[prop] = this[prop]();
        }

        for (const array of this.arrayObservables) {
            saveObject[array] = this[array].map(x => x());
        }

        for (const object of this.objectObservables) {
            saveObject[object] = {};
            Object.entries(this[object]).forEach(([key, val]: [string, KnockoutObservable<number>]) => {
                saveObject[object][key] = val();
            });
        }

        return saveObject;
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        for (const prop of this.observables) {
            this[prop](json[prop] || 0);
        }

        for (const array of this.arrayObservables) {
            json[array]?.forEach((el, index) => {
                if (this[array] && +el) {
                    this[array][index](+el);
                }
            });
        }

        for (const object of this.objectObservables) {
            if (json[object]) {
                Object.entries(json[object]).forEach(([key, val]) => {
                    const num = +val;
                    if (!isNaN(num) && num) {
                        this[object][key](num);
                    }
                });
            }
        }
    }

}
