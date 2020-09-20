///<reference path="Requirement.ts"/>

class ObtainedPokemonRequirement extends Requirement {
    public pokemonID: number;

    constructor(pokemon: DataPokemon, value = 1, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.pokemonID = pokemon.id;
    }

    public getProgress() {
        return Math.min(App.game?.statistics?.pokemonCaptured[this.pokemonID](), this.requiredValue);
    }

    public hint(): string {
        return `${pokemonMap[this.pokemonID].name} needs to be caught.`;
    }
}
