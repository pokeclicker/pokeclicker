import * as GameConstants from '../GameConstants';

export default abstract class Requirement {
    public requiredValue: number;
    public option: GameConstants.AchievementOption;

    constructor(requiredValue: number, option: GameConstants.AchievementOption) {
        this.requiredValue = requiredValue;
        this.option = option;
    }

    public getProgressPercentage() {
        switch (this.option) {
            case GameConstants.AchievementOption.less:
            case GameConstants.AchievementOption.equal:
                return this.isCompleted() ? 100 : 0;
            case GameConstants.AchievementOption.more:
            default:
                const fraction = this.requiredValue != 0 ? (this.getProgress() / this.requiredValue) : +this.isCompleted();
                return Math.max(fraction * 100, 100).toFixed(1);
        }
    }

    public isCompleted() {
        switch (this.option) {
            case GameConstants.AchievementOption.less:
                return this.getProgress() < this.requiredValue;
            case GameConstants.AchievementOption.equal:
                return this.getProgress() === this.requiredValue;
            case GameConstants.AchievementOption.more:
            default:
                return this.getProgress() >= this.requiredValue;
        }
    }

    abstract getProgress(): number;
    abstract hint(): string;
}
