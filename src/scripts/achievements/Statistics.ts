class Statistics {

    public clicks: KnockoutObservable<number>;
    public hatchedEggs: KnockoutObservable<number>;
    public pokemonCaptured: KnockoutObservable<number>;
    public pokemonDefeated: KnockoutObservable<number>;
    public gymsDefeated: KnockoutObservableArray<number>;
    public dungeonsCleared: KnockoutObservableArray<number>
    public digItems: KnockoutObservable<number>; // Total treasure found in underground
    public digDeeper: KnockoutObservable<number>; // Total underground layers completed

    constructor(saved = {}) {
        let props = [
            "clicks",
            "hatchedEggs",
            "pokemonCaptured",
            "pokemonDefeated",
            "gymsDefeated",
            "dungeonsCleared",
            "digItems",
            "digDeeper",
        ];

        for (let prop of props) {
            this[prop] = ko.observable(saved[prop] || 0)
        }
    }

}
