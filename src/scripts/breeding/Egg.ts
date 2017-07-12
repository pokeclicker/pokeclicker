class Egg {
    totalSteps: number;
    steps: number;
    pokemon: string;
    type: GameConstants.EggType;

    constructor(totalSteps: number, pokemon: string, type: GameConstants.EggType) {
        this.totalSteps = totalSteps;
        this.steps = 0;
        this.pokemon = pokemon;
        this.type = type;
    }
}