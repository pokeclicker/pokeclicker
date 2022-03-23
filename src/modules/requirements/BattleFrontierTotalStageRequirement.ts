import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class BattleFrontierTotalStageRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Battle Frontier']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.battleFrontierTotalStagesCompleted(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} total Stages need to be completed at the Battle Frontier.`;
    }
}
