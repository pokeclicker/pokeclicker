class Pokeball {
    public type: GameConstants.Pokeball;
    public catchBonus: number;
    public catchTime: number;
    public quantity: KnockoutObservable<number>;
    public image: string;
    public description: string;

    constructor(type: GameConstants.Pokeball, catchBonus: number, catchTime: number, image: string, description: string, quantity = 0) {
        this.type = type;
        this.catchBonus = catchBonus;
        this.catchTime = catchTime;
        this.image = image;
        this.description = description;
        this.quantity = ko.observable(quantity);
    }
}