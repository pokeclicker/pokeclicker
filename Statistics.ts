class Statistics {

    public clicks: KnockoutObservable<number>;
    public hatchedEggs: KnockoutObservable<number>;
    public pokemonCaptured: KnockoutObservable<number>;
    public pokemonDefeated: KnockoutObservable<number>;
    public gymsDefeated: KnockoutObservableArray<number>;
    public dungeonsCleared: KnockoutObservableArray<number>
    public digItems: KnockoutObservable<number>;
    public digDeeper: KnockoutObservable<number>;

    incrementObservable(obs, amt: number = 1) {
    obs(obs() + amt);
    }
}
