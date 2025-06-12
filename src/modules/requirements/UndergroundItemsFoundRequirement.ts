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
        const suffix = this.requiredValue > 1 ? 's' : '';
        return `Collect ${this.requiredValue} item${suffix} from the Underground mines.`;
    }
}
