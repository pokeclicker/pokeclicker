///<reference path="Requirement.ts"/>

class NullRequirement extends Requirement {
    constructor() {
        super(69420, GameConstants.AchievementOption.more);
    }

    public getProgress() {
        return Math.min(0, this.requiredValue);
    }

    public hint(): string {
        return 'This is probably still under development.';
    }
}
