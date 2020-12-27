import { AchievementOption } from '../GameConstants';

export default abstract class Requirement {
    public requiredValue: number;
    public type: AchievementOption;

    constructor(requiredValue: number, type: AchievementOption) {
        this.requiredValue = requiredValue;
        this.type = type;
    }
    public getProgressPercentage() {
        return (this.getProgress() / (this.requiredValue * 100)).toFixed(1);
    }
    public isCompleted() {
        switch (this.type) {
            default: case AchievementOption.less:
                return this.getProgress() < this.requiredValue;
            case AchievementOption.equal:
                return this.getProgress() === this.requiredValue;
            case AchievementOption.more:
                return this.getProgress() >= this.requiredValue;
        }
    }
    abstract getProgress(): number;
    abstract hint(): string;
}
