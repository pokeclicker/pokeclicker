import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class DefeatedSpecificPokemonRequirement extends Requirement {
    constructor(private pokemonId: number, value: number, private shiny: boolean = false, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option);
    }

    public getProgress() {
        if (this.shiny)
            return App.game.statistics.shinyPokemonDefeated[this.pokemonId]();
        else
            return App.game.statistics.pokemonDefeated[this.pokemonId]();
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
