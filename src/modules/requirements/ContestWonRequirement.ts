import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class ContestWonRequirement extends AchievementRequirement {
    constructor(private resultRequired: GameConstants.ContestResults, value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        let total = App.game.statistics.contestResults[GameConstants.ContestResults.Normal]();
        if (this.resultRequired <= GameConstants.ContestResults.Super) {
            total += App.game.statistics.contestResults[GameConstants.ContestResults.Super]();
        }
        if (this.resultRequired <= GameConstants.ContestResults.Hyper) {
            total += App.game.statistics.contestResults[GameConstants.ContestResults.Hyper]();
        }
        if (this.resultRequired <= GameConstants.ContestResults.Master) {
            total += App.game.statistics.contestResults[GameConstants.ContestResults.Master]();
        }
        return Math.min(total, this.requiredValue);
    }

    public hint(): string {
        return `You need to complete atleast ${this.requiredValue} Contests with result ${GameConstants.ContestResults[this.resultRequired]} or higher.`;
    }

    public toString(): string {
        return `${super.toString()} ${this.resultRequired}`;
    }
}
