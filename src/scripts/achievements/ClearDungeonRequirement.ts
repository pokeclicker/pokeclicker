///<reference path="Requirement.ts"/>

class ClearDungeonRequirement extends Requirement {
    private dungeonIndex: number; // Gym name index in array GameConstants.Gyms

    constructor(value: number, dungeonIndex: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.dungeonIndex = dungeonIndex;
    }

    public getProgress() {
        return Math.min(App.game.statistics.dungeonsCleared[this.dungeonIndex](), this.requiredValue);
    }
}