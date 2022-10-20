import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class UndergroundItemsFoundRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Underground);
    }

    public getProgress() {
        return Math.min(App.game.statistics.undergroundItemsFound(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} items need to be found in the Underground.`;
    }
}
