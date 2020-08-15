abstract class Requirement {
    public requiredValue: number;
    public type: GameConstants.AchievementOption;

    constructor(requiredValue: number, type: GameConstants.AchievementOption) {
        this.requiredValue = requiredValue;
        this.type = type;
    }

    abstract getProgress();
    abstract hint();

    public getProgressPercentage() {
        return (this.getProgress() / this.requiredValue * 100).toFixed(1);
    }

    public isCompleted() {
        switch (this.type) {
            case GameConstants.AchievementOption.less:
                return this.getProgress() < this.requiredValue;
            case GameConstants.AchievementOption.equal:
                return this.getProgress() == this.requiredValue;
            case GameConstants.AchievementOption.more:
                return this.getProgress() >= this.requiredValue;
        }
    }

}

