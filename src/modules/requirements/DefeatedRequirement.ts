import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class DefeatedRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Total Defeated']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalPokemonDefeated(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokémon need to be defeated.`;
    }
}
