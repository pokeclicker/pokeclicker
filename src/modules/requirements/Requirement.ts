import * as GameConstants from '../GameConstants';

export default abstract class Requirement {
    public requiredValue: number;
    public option: GameConstants.AchievementOption;

    constructor(requiredValue: number, option: GameConstants.AchievementOption) {
        this.requiredValue = requiredValue;
        this.option = option;
    }

    public getProgressPercentage() {
        return ((this.getProgress() / this.requiredValue) * 100).toFixed(1);
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
