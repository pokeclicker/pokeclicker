import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class QuestLevelRequirement extends AchievementRequirement {
    constructor(levelRequired: number) {
        super(levelRequired, GameConstants.AchievementOption.more, GameConstants.AchievementType.Quest);
    }

    public getProgress() {
        return Math.min(App.game.quests.level(), this.requiredValue);
    }

    public hint(): string {
        return `Needs quest level ${this.requiredValue}.`;
    }
}
