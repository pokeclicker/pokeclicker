import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class TimePlayedRequirement extends AchievementRequirement {
    constructor(secondsPlayed: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(secondsPlayed, option);
    }

    public getProgress() {
        return Math.min(App.game.statistics.secondsPlayed(), this.requiredValue);
    }

    public hint(): string {
        return `Be in-game for a total of ${this.requiredValue.toLocaleString('en-US')} seconds.`;
    }
}
