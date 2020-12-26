///<reference path="Requirement.ts"/>

class ClearDungeonRequirement extends Requirement {
    public dungeonIndex: number; // Gym name index in array GameConstants.Gyms

    constructor(value: number, dungeonIndex: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Clear Dungeon']);
        this.dungeonIndex = dungeonIndex;
    }

    public getProgress() {
        return Math.min(App.game.statistics.dungeonsCleared[this.dungeonIndex](), this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue != 1) {
            return `${GameConstants.RegionDungeons.flat()[this.dungeonIndex]} needs to be completed ${this.requiredValue} times.`;
        } else {
            return `${GameConstants.RegionDungeons.flat()[this.dungeonIndex]} needs to be completed.`;
        }
    }
}
