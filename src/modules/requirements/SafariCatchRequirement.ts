import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class SafariCatchRequirement extends AchievementRequirement {
    constructor(value: number, private shiny: boolean = false, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        if (this.shiny)
            return Math.min(App.game.statistics.safariShinyPokemonCaptured(), this.requiredValue);
        else
            return Math.min(App.game.statistics.safariPokemonCaptured(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue}${this.shiny ? ' Shiny' : ''} Pokémon needs to be captured in a Safari Zone.`;
    }
}
