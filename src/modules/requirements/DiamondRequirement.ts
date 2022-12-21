import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class DiamondRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Underground);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalDiamonds(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Diamonds need to be obtained.`;
    }
}
