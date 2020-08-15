///<reference path="Requirement.ts"/>

class MoneyRequirement extends Requirement {
    constructor( requiredValue: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(requiredValue, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalMoney(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokédollars need to be obtained.`;
    }
}