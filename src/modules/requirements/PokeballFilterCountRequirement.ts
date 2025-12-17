import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class PokeballFilterCountRequirement extends AchievementRequirement {
    constructor(
        requiredAmount: number,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more,
    ) {
        super(requiredAmount, option);
    }

    public getProgress() {
        return Math.min(App.game.pokeballFilters.list().length, this.requiredValue);
    }

    public hint(): string {
        return `Have at least x${this.requiredValue} Pokéball Filters.`;
    }
}
