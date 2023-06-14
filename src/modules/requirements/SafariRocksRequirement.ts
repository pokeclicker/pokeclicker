import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class SafariRocksRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        return Math.min(App.game.statistics.safariRocksThrown(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Rocks needs to be thrown in a Safari Zone.`;
    }
}
