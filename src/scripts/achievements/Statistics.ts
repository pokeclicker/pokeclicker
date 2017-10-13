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
    public pokeballsUsed: Array<KnockoutObservable<number>>;
    public totalShards: Array<KnockoutObservable<number>>;
    public oakItemUses: Array<KnockoutObservable<number>>;

    private static readonly arraySizes = {
        "gymsDefeated": GameConstants.KantoGyms.length + GameConstants.JohtoGyms.length,
        "dungeonsCleared": GameConstants.KantoDungeons.length + GameConstants.JohtoDungeons.length,
        "pokeballsUsed": GameHelper.enumLength(GameConstants.Pokeball) - 1,// remove "None" pokeball type
        "totalShards": GameHelper.enumLength(GameConstants.PokemonType) - 1,// remove "None" pokemon type
        "oakItemUses": GameHelper.enumLength(GameConstants.OakItem),
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
        ];

        let arrayObservables = [
            "gymsDefeated",
            "dungeonsCleared",
            "pokeballsUsed",
            "totalShards",
            "oakItemUses",
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

    public static getGymIndex(gym: string, region: GameConstants.Region) {
        let index;
        switch (region) {
            case 0:
                index = GameConstants.KantoGyms.indexOf(gym);
                break;
            case 1:
                index = GameConstants.KantoGyms.length;
                index += GameConstants.JohtoGyms.indexOf(gym);
                break;
        }
        return index;
    }

    public static getDungeonIndex(dungeon: string) {
        let index;
        if (GameConstants.KantoDungeons.indexOf(dungeon) > -1) {
            index = GameConstants.KantoDungeons.indexOf(dungeon)
            return index;
        } else {
            index = GameConstants.KantoDungeons.length;
        }
        if (GameConstants.JohtoDungeons.indexOf(dungeon) > -1) {
            index += GameConstants.JohtoDungeons.indexOf(dungeon)
            return index;
        } else {
            index += GameConstants.JohtoDungeons.length;
        }
        console.log("Failed to find dungeon");
        return index;
    }

}
