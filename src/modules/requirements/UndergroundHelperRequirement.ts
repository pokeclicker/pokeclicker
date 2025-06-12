import AchievementRequirement from './AchievementRequirement';
import * as GameConstants from '../GameConstants';

export default class UndergroundHelperRequirement extends AchievementRequirement {
    constructor(helpersUnlocked: number, public levelRequired: number) {
        super(helpersUnlocked, GameConstants.AchievementOption.more, GameConstants.AchievementType.Underground);
    }

    public getProgress(): number {
        return Math.min(App.game.underground.helpers.available().filter(helper => helper.level >= this.levelRequired).length, this.requiredValue);
        // return this.requiredValue - 1;
    }

    public hint(): string {
        return `${this.requiredValue} Underground Experts with at least level ${this.levelRequired}`;
    }
}
