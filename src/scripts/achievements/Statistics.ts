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
    public pokeballsUsed: Array<KnockoutObservable<number>>;
    public pokeballsBought: Array<KnockoutObservable<number>>;
    public totalShards: Array<KnockoutObservable<number>>;
    public oakItemUses: Array<KnockoutObservable<number>>;
    public berriesHarvested: Array<KnockoutObservable<number>>;
    public prestigesCompleted: Array<KnockoutObservable<number>>;

    private static readonly arraySizes = {
        "gymsDefeated": GameConstants.KantoGyms.length + GameConstants.JohtoGyms.length,
        "dungeonsCleared": GameConstants.KantoDungeons.length + GameConstants.JohtoDungeons.length,
        "pokeballsUsed": GameHelper.enumLength(GameConstants.Pokeball) - 1,   // remove "None" pokeball type
        "pokeballsBought": GameHelper.enumLength(GameConstants.Pokeball) - 1, // remove "None" pokeball type
        "totalShards": GameHelper.enumLength(GameConstants.PokemonType) - 1,  // remove "None" pokemon type
        "oakItemUses": GameHelper.enumLength(GameConstants.OakItem),
        "berriesHarvested": GameHelper.enumLength(GameConstants.BerryType),
        "prestigesCompleted": GameHelper.enumLength(GameConstants.PrestigeType),
    }

    constructor(saved = {}) {
        let observables = [
            "clicks",
            "hatchedEggs",
            "pokemonCaptured",
            "pokemonDefeated",
            "digItems",
            "digDeeper",
            "totalMoney",
            "totalTokens",
            "totalQuestPoints",
            "totalDiamonds",
        ];

        let arrayObservables = [
            "gymsDefeated",
            "dungeonsCleared",
            "pokeballsUsed",
            "pokeballsBought",
            "totalShards",
            "oakItemUses",
            "berriesHarvested",
            "prestigesCompleted",
        ]

        for (let prop of observables) {
            this[prop] = ko.observable(saved[prop] || 0)
        }

        for (let array of arrayObservables) {
            this[array] = Array.apply(null, Array(Statistics.arraySizes[array])).map((value, index) => {
                return ko.observable(saved[array] ? saved[array][index] || 0 : 0)
            })
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
