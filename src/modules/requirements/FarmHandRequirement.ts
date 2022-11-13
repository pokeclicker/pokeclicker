import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class FarmHandRequirement extends AchievementRequirement {
    constructor(handsUnlocked: number) {
        super(handsUnlocked, GameConstants.AchievementOption.more, GameConstants.AchievementType.Farming);
    }

    public getProgress() {
        return Math.min(App.game.farming.farmHands.available().length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Farm Hands needs to be unlocked.`;
    }
}
