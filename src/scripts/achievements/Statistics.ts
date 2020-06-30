///<reference path="../oakItems/OakItems.ts"/>
///<reference path="../farming/BerryType.ts"/>
///<reference path="../pokemons/PokemonType.ts"/>
class Statistics {

    public clicks: KnockoutObservable<number>;
    public hatchedEggs: KnockoutObservable<number>;
    public pokemonCaptured: KnockoutObservable<number>;
    public pokemonDefeated: KnockoutObservable<number>;
    public gymsDefeated: Array<KnockoutObservable<number>>;
    public dungeonsCleared: Array<KnockoutObservable<number>>;
    public digItems: KnockoutObservable<number>; // Total treasure found in underground
    public digDeeper: KnockoutObservable<number>; // Total underground layers completed
    public totalMoney: KnockoutObservable<number>;
    public totalTokens: KnockoutObservable<number>;
    public totalQuestPoints: KnockoutObservable<number>;
    public totalDiamonds: KnockoutObservable<number>;
    public totalFarmPoints: KnockoutObservable<number>;
    public pokeballsUsed: Array<KnockoutObservable<number>>;
    public pokeballsBought: Array<KnockoutObservable<number>>;
    public totalShards: Array<KnockoutObservable<number>>;
    public oakItemUses: Array<KnockoutObservable<number>>;
    public berriesHarvested: Array<KnockoutObservable<number>>;
    public routeKills: Array<KnockoutObservable<number>>;

    private static readonly arraySizes = {
        'gymsDefeated': GameConstants.RegionGyms.flat().length,
        'dungeonsCleared': GameConstants.RegionDungeons.flat().length,
        'pokeballsUsed': GameHelper.enumLength(GameConstants.Pokeball) - 1,   // remove "None" pokeball type
        'pokeballsBought': GameHelper.enumLength(GameConstants.Pokeball) - 1, // remove "None" pokeball type
        'totalShards': GameHelper.enumLength(PokemonType) - 1,  // remove "None" pokemon type
        'oakItemUses': GameHelper.enumLength(OakItems.OakItem),
        'berriesHarvested': GameHelper.enumLength(BerryType) - 1,  // remove "None" berry
        'routeKills': GameConstants.AMOUNT_OF_ROUTES + 1,
    };

    constructor(saved = {}) {
        const observables = [
            'clicks',
            'hatchedEggs',
            'pokemonCaptured',
            'pokemonDefeated',
            'digItems',
            'digDeeper',
            'totalMoney',
            'totalTokens',
            'totalQuestPoints',
            'totalDiamonds',
            'totalFarmPoints',
        ];

        const arrayObservables = [
            'gymsDefeated',
            'dungeonsCleared',
            'pokeballsUsed',
            'pokeballsBought',
            'totalShards',
            'oakItemUses',
            'berriesHarvested',
            'routeKills',
        ];

        for (const prop of observables) {
            this[prop] = ko.observable(saved[prop] || 0);
        }

        for (const array of arrayObservables) {
            this[array] = [...Array(Statistics.arraySizes[array])].map((value, index) => {
                return ko.observable(saved[array] ? saved[array][index] || 0 : 0);
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

}
