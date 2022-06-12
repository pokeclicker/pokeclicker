///<reference path="../../declarations/requirements/Requirement.d.ts"/>

class StoneUnlockedRequirement extends Requirement {
    constructor(stoneType: GameConstants.StoneType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        const stone = ItemList[GameConstants.StoneType[stoneType]] as EvolutionStone;
        let requiredRegion = GameConstants.Region.kanto;
        if (stone) {
            requiredRegion = stone.unlockedRegion;
        }
        super(requiredRegion, option);
    }

    public getProgress() {
        return Math.min(player.highestRegion(), this.requiredValue);
    }

    public hint(): string {
        return `You need to reach the ${GameConstants.Region[this.requiredValue]} region.`;
    }
}
