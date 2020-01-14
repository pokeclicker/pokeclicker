///<reference path="Requirement.ts"/>

class ClearDungeonRequirement extends Requirement {
    private name: DungeonName; // Gym name index in array GameConstants.Gyms

    constructor(value: number, name: DungeonName, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.name = name;
    }

    public getProgress() {
        return Math.min(player.statistics.dungeonsCleared[this.name](), this.requiredValue);
    }
}