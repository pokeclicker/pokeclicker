///<reference path="Requirement.ts"/>

class ClearGymRequirement extends Requirement {
    public gymIndex: number; // Gym name index in array GameConstants.Gyms

    constructor(value: number, gymIndex: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.gymIndex = gymIndex;
    }

    public getProgress() {
        return Math.min(App.game.statistics.gymsDefeated[this.gymIndex](), this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue != 1) {
            return `Requires the ${GameConstants.RegionDungeons.flat()[this.gymIndex]} Gym to be defeated ${this.requiredValue} times.`;
        } else {
            return `Requires the ${GameConstants.RegionDungeons.flat()[this.gymIndex]} Gym to be completed.`;
        }
    }
}