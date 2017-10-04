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

    private static readonly arraySizes = {
        "gymsDefeated": GameConstants.Gyms.length,
        "dungeonsCleared": GameConstants.Dungeons.length,
        "pokeballsUsed": 4,
        "totalShards": 18,
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

}
