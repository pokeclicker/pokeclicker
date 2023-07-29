import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class SafariBaitRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        return Math.min(App.game.statistics.safariBaitThrown(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Bait needs to be thrown in a Safari Zone.`;
    }
}
