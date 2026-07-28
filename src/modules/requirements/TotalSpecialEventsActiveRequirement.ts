import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class TotalSpecialEventsActiveRequirement extends AchievementRequirement {
    constructor(requiredValue: number) {
        super(requiredValue, GameConstants.AchievementOption.more);
    }

    public getProgress() {
        return Math.min(App.game.specialEvents.activeEventCount(), this.requiredValue);
    }

    public hint(): string {
        return `Have ${this.requiredValue} or more Special Events active simultaneously.`;
    }
}
