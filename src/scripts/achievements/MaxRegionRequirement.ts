///<reference path="Requirement.ts"/>

class MaxRegionRequirement extends Requirement {
    constructor(maxRegion = GameConstants.Region.none, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(maxRegion, option);
    }

    public getProgress() {
        return Math.min(player.highestRegion(), this.requiredValue);
    }

    public hint(): string {
        return `You need to reach the ${GameConstants.Region[this.requiredValue]} region.`;
    }
}
