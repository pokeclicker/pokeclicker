///<reference path="AchievementRequirement.ts"/>

class FarmPlotsUnlockedRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Farming']);
    }

    public getProgress() {
        return Math.min(App.game.farming.plotList.filter(p => p.isUnlocked).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Plots in the Farm need to be unlocked .`;
    }
}
