///<reference path="../../declarations/requirements/Requirement.d.ts"/>

class ObtainedPokemonRequirement extends Requirement {
    public pokemonID: number;

    constructor(pokemon: PokemonListData, uncaught = false) {
        const option = uncaught ? GameConstants.AchievementOption.less : GameConstants.AchievementOption.more;
        super(1, option);
        this.pokemonID = pokemon.id;
    }

    public getProgress() {
        return Math.min(App.game?.statistics?.pokemonCaptured[this.pokemonID](), this.requiredValue);
    }

    public hint(): string {
        return this.option == GameConstants.AchievementOption.more ?
            `${pokemonMap[this.pokemonID].name} needs to be caught.` :
            `${pokemonMap[this.pokemonID].name} cannot be caught yet.`;
    }
}
