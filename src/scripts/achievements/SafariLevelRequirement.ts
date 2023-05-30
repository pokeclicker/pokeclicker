class SafariLevelRequirement extends AchievementRequirement {
    constructor(levelRequired: number) {
        super(levelRequired, GameConstants.AchievementOption.more, GameConstants.AchievementType.Safari);
    }

    public getProgress() {
        return Math.min(Safari.safariLevel(), this.requiredValue);
    }

    public hint(): string {
        return `Needs Safari Level ${this.requiredValue}.`;
    }
}
