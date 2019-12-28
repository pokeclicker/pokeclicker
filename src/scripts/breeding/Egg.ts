class Egg implements Saveable {
    saveKey: string = "egg";

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

    toJSON(): object {
        return {
            totalSteps: this.totalSteps,
            steps: this.steps(),
            shinySteps: this.shinySteps,
            pokemon: this.pokemon,
            type: this.type,
            notified: this.notified,
        };

    }

    fromJSON(json: object): void {
        this.totalSteps = json["totalSteps"];
        this.steps = ko.observable(json["steps"]);
        this.shinySteps = json["shinySteps"];
        this.pokemon = json["pokemon"];
        this.type = json["type"];
        this.notified = json["boolean"];
        this.progress = ko.computed(function () {
            return this.steps() / this.totalSteps * 100;
        }, this);
    }


}
