import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class SafariCatchRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        return Math.min(App.game.statistics.safariPokemonCaptured(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokémon needs to be captured in a Safari Zone.`;
    }
}
