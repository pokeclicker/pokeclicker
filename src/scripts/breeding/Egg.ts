class Egg {
    totalSteps: number;
    steps: KnockoutObservable<number>;
    shinySteps: number;
    pokemon: string;
    type: GameConstants.EggType;
    notified: boolean;
    progress: KnockoutComputed<number>;

    constructor(totalSteps: number, pokemon: string, type: GameConstants.EggType) {
        this.totalSteps = totalSteps;
        this.steps = ko.observable(0);
        this.shinySteps = 0;
        this.pokemon = pokemon;
        this.type = type;
        this.notified = false;
        this.progress = ko.computed(function () {
            console.log(this.steps() / this.totalSteps);
            return this.steps() / this.totalSteps * 100;
        }, this);
    }

}