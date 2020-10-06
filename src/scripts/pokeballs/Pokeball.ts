class Pokeball {
    public type: GameConstants.Pokeball;
    public catchBonus: number;
    public catchTime: number;
    public quantity: KnockoutObservable<number>;

    constructor(type: GameConstants.Pokeball, catchBonus: number, catchTime: number, quantity = 0) {
        this.type = type;
        this.catchBonus = catchBonus;
        this.catchTime = catchTime;
        this.quantity = ko.observable(quantity);
    }
}