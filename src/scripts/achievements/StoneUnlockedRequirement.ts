///<reference path="../../declarations/requirements/Requirement.d.ts"/>

class StoneUnlockedRequirement extends Requirement {
    stone: EvolutionStone;

    constructor(stoneType: GameConstants.StoneType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        const stone = ItemList[GameConstants.StoneType[stoneType]] as EvolutionStone;
        const requiredRegion = stone?.unlockedRegion ?? GameConstants.Region.none;
        super(requiredRegion, option);
        this.stone = stone;
    }

    public getProgress() {
        return Math.min(player.highestRegion(), this.requiredValue);
    }

    public isCompleted(): boolean {
        if (!this.stone) {
            return true;
        }
        return this.stone.unlockedRegion <= player.highestRegion();
    }

    public hint(): string {
        if (this.requiredValue > GameConstants.MAX_AVAILABLE_REGION) {
            return 'This item is from a region that hasn\'t been released yet.';
        }
        return `You need to reach the ${GameConstants.camelCaseToString(GameConstants.Region[this.requiredValue])} region.`;
    }
}
