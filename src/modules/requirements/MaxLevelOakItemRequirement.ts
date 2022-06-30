import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class MaxLevelOakItemRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Max Level Oak Item']);
    }

    public getProgress() {
        return Math.min(App.game.oakItems.maxLevelOakItems(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Oak Items leveled to the maximum level.`;
    }
}
