import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class QuestRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Quest);
    }

    public getProgress() {
        return Math.min(App.game.statistics.questsCompleted(), this.requiredValue);
    }

    public hint(): string {
        return `Complete ${this.requiredValue.toLocaleString('en-US')} quests.`;
    }
}
