///<reference path="../oakItems/OakItems.ts"/>
///<reference path="../farming/BerryType.ts"/>
///<reference path="../pokemons/PokemonType.ts"/>
class Statistics implements Saveable {
    saveKey = 'statistics';

    defaults = {};

    clicks: KnockoutObservable<number>;
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
    digItems: KnockoutObservable<number>; // Total treasure found in underground
    digDeeper: KnockoutObservable<number>; // Total underground layers completed
    totalMoney: KnockoutObservable<number>;
    totalTokens: KnockoutObservable<number>;
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
        'clicks',
        'hatchedEggs',
        'digItems',
        'digDeeper',
        'totalMoney',
        'totalTokens',
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

    private static readonly arraySizes = {
        'gymsDefeated': GameConstants.RegionGyms.flat().length,
        'dungeonsCleared': GameConstants.RegionDungeons.flat().length,
        'pokeballsUsed': GameHelper.enumLength(GameConstants.Pokeball) - 1,   // remove "None" pokeball type
        'pokeballsBought': GameHelper.enumLength(GameConstants.Pokeball) - 1, // remove "None" pokeball type
        'totalShards': GameHelper.enumLength(PokemonType) - 1,  // remove "None" pokemon type
        'oakItemUses': GameHelper.enumLength(OakItems.OakItem),
        'berriesHarvested': GameHelper.enumLength(BerryType) - 1,  // remove "None" berry
        'routeKills': GameConstants.HIGHEST_ROUTE_NUMBER + 1, // Add 1 for "route 0"
        'pokemonCaptured': GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION] + 1,
        'pokemonDefeated': GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION] + 1,
        'pokemonEncountered': GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION] + 1,
        'shinyPokemonCaptured': GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION] + 1,
        'shinyPokemonDefeated': GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION] + 1,
        'shinyPokemonEncountered': GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION] + 1,
    };

    constructor() {
        for (const prop of this.observables) {
            this[prop] = ko.observable(0);
        }

        for (const array of this.arrayObservables) {
            this[array] = [...Array(Statistics.arraySizes[array])].map((value, index) => {
                return ko.observable(0);
            });
        }
    }

    public static getGymIndex(gym: string) {
        const gyms = GameConstants.RegionGyms.flat();
        return gyms.indexOf(gym);
    }

    public static getDungeonIndex(dungeon: string) {
        const dungeons = GameConstants.RegionDungeons.flat();
        return dungeons.indexOf(dungeon);
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
            this[array].forEach((el, index) => {
                el(json[array] ? json[array][index] || 0 : 0);
            });
        }
    }

}
