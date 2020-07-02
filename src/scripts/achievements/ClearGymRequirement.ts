///<reference path="Requirement.ts"/>

class ClearGymRequirement extends Requirement {
    private gymIndex: number; // Gym name index in array GameConstants.Gyms

    constructor(value: number, gymIndex: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.gymIndex = gymIndex;
    }

    public getProgress() {
        return Math.min(App.game.statistics.gymsDefeated[this.gymIndex](), this.requiredValue);
    }
}