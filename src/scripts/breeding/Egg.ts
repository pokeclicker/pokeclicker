class Egg {
    totalSteps: number;
    steps: number;
    shinySteps: number;
    pokemon: string;
    type: GameConstants.EggType;
    notified: boolean;

    constructor(totalSteps: number, pokemon: string, type: GameConstants.EggType) {
        this.totalSteps = totalSteps;
        this.steps = 0;
        this.shinySteps = 0;
        this.pokemon = pokemon;
        this.type = type;
        this.notified = false;
    }
}