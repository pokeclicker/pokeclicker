import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class HatcheryHelperRequirement extends AchievementRequirement {
    constructor(helpersUnlocked: number, public levelRequired: number) {
        super(helpersUnlocked, GameConstants.AchievementOption.more, GameConstants.AchievementType.Hatchery);
    }

    public getProgress() {
        return Math.min(App.game.breeding.hatcheryHelpers.available().filter((h) => h.level() >= this.levelRequired).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Hatchery Helpers need to be at level ${this.levelRequired} or more.`;
    }

    public toString(): string {
        return `${super.toString()} ${this.levelRequired}`;
    }
}
