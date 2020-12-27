/// <reference path="../../declarations/achievements/Requirement.d.ts" />

class UndergroundLayersMinedRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.undergroundLayersMined(), this.requiredValue);
    }

    public hint(): string {
        const suffix = (this.requiredValue > 1) ? 's' : '';
        return `${this.requiredValue} layer${suffix} need to be mined in the Underground.`;
    }
}
