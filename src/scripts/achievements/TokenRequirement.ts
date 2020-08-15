///<reference path="Requirement.ts"/>

class TokenRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalDungeonTokens(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Dungeon Tokens need to be obtained.`;
    }
}
