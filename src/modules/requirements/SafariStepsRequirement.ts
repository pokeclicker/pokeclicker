import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class SafariStepsRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        return Math.min(App.game.statistics.safariStepsTaken(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Steps needs to be taken in a Safari Zone.`;
    }
}
