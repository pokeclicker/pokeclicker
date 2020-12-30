abstract class Requirement {
    public requiredValue: number;
    public option: GameConstants.AchievementOption;
    public achievementType: GameConstants.AchievementType;

    constructor(requiredValue: number, option: GameConstants.AchievementOption, achievementType: GameConstants.AchievementType = GameConstants.AchievementType.None) {
        this.requiredValue = requiredValue;
        this.option = option;
        this.achievementType = achievementType;
    }

    abstract getProgress(): number;
    abstract hint(): string;

    public getProgressPercentage() {
        return (this.getProgress() / this.requiredValue * 100).toFixed(1);
    }

    public isCompleted() {
        switch (this.option) {
            case GameConstants.AchievementOption.less:
                return this.getProgress() < this.requiredValue;
            case GameConstants.AchievementOption.equal:
                return this.getProgress() == this.requiredValue;
            case GameConstants.AchievementOption.more:
                return this.getProgress() >= this.requiredValue;
        }
    }

}

