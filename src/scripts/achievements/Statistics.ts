///<reference path="../oakItems/OakItems.ts"/>
///<reference path="../farming/BerryType.ts"/>
///<reference path="../pokemons/PokemonType.ts"/>
class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults = {};

    selectedPokemonID = ko.observable(1);

    clickAttacks: KnockoutObservable<number>;
    hatchedEggs: KnockoutObservable<number>;
    pokemonCaptured: Array<KnockoutObservable<number>>;
    pokemonDefeated: Array<KnockoutObservable<number>>;
    pokemonEncountered: Array<KnockoutObservable<number>>;
    shinyPokemonCaptured: Array<KnockoutObservable<number>>;
    shinyPokemonDefeated: Array<KnockoutObservable<number>>;
    shinyPokemonEncountered: Array<KnockoutObservable<number>>;
    totalPokemonCaptured: KnockoutObservable<number>;
    totalPokemonDefeated: KnockoutObservable<number>;
    totalPokemonEncountered: KnockoutObservable<number>;
    totalShinyPokemonCaptured: KnockoutObservable<number>;
    totalShinyPokemonDefeated: KnockoutObservable<number>;
    totalShinyPokemonEncountered: KnockoutObservable<number>;
    gymsDefeated: Array<KnockoutObservable<number>>;
    dungeonsCleared: Array<KnockoutObservable<number>>;
    undergroundItemsFound: KnockoutObservable<number>; // Total treasure found in underground
    undergroundLayersMined: KnockoutObservable<number>; // Total underground layers completed
    totalMoney: KnockoutObservable<number>;
    totalDungeonTokens: KnockoutObservable<number>;
    totalQuestPoints: KnockoutObservable<number>;
    totalDiamonds: KnockoutObservable<number>;
    totalFarmPoints: KnockoutObservable<number>;
    pokeballsUsed: Array<KnockoutObservable<number>>;
    pokeballsBought: Array<KnockoutObservable<number>>;
    totalShards: Array<KnockoutObservable<number>>;
    oakItemUses: Array<KnockoutObservable<number>>;
    berriesHarvested: Array<KnockoutObservable<number>>;
    routeKills: Array<KnockoutObservable<number>>;
    observables = [
        'clickAttacks',
        'hatchedEggs',
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
        'totalShinyPokemonCaptured',
        'totalShinyPokemonDefeated',
        'totalShinyPokemonEncountered',
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
        'pokemonCaptured',
        'pokemonDefeated',
        'pokemonEncountered',
        'shinyPokemonCaptured',
        'shinyPokemonDefeated',
        'shinyPokemonEncountered',
    ];

    constructor() {
        for (const prop of this.observables) {
            this[prop] = ko.observable(0);
        }

        for (const array of this.arrayObservables) {
            this[array] = new Proxy([ko.observable(0)], {
                get: (statistics, prop: string) => {
                    if (statistics[prop]) {
                        return statistics[prop];
                    }

                    // If it's not an int or less than zero, we do not want to set it
                    const id: number = +prop;
                    if (isNaN(id) || id < 0) {
                        if (isNaN(id)) {
                            console.trace(`[Statistics] [${array}] Invalid property requested:`, prop);
                        }
                        return () => 0;
                    }
                    statistics[id] = ko.observable(0);
                    return statistics[id];
                },

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

    toJSON(): object {
        const saveObject = {};

        for (const prop of this.observables) {
            saveObject[prop] = this[prop]();
        }

        for (const array of this.arrayObservables) {
            saveObject[array] = this[array].map(x => x());
        }

        return saveObject;
    }

    fromJSON(json: object): void {
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
    }

}
