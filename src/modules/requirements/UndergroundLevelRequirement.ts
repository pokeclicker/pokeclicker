import AchievementRequirement from './AchievementRequirement';
import * as GameConstants from '../GameConstants';

export default class UndergroundLevelRequirement extends AchievementRequirement {
    constructor(level: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(level, option, GameConstants.AchievementType.Underground);
    }

    public getProgress(): number {
        return Math.min(App.game.underground.undergroundLevel, this.requiredValue);
    }

    public hint(): string {
        return `Requires level ${this.requiredValue} in the Underground.`;
    }
}
