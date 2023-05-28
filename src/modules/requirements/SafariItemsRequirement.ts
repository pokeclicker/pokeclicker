import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class SafariItemsRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        return Math.min(App.game.statistics.safariItemsObtained(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Items needs to be picked up in a Safari Zone.`;
    }
}
