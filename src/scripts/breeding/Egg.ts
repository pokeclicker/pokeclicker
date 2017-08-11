class Egg {
    totalSteps: number;
    steps: KnockoutObservable<number>;
    shinySteps: number;
    pokemon: string;
    type: GameConstants.EggType;
    notified: boolean;
    progress: KnockoutComputed<number>;

    constructor(totalSteps: number, pokemon: string, type: GameConstants.EggType, steps: number = 0, shinySteps: number = 0, notified: boolean = false) {
        this.totalSteps = totalSteps;
        this.steps = ko.observable(steps);
        this.shinySteps = shinySteps;
        this.pokemon = pokemon;
        this.type = type;
        this.notified = notified;
        this.progress = ko.computed(function () {
            return this.steps() / this.totalSteps * 100;
        }, this);
    }

}