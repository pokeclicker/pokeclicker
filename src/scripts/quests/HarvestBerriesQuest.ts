/// <reference path="Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {
    constructor(berryType: string, amount: number) {
        super(amount, HarvestBerriesQuest.calcReward(berryType, amount));
        this.description = `Harvest ${amount} ${berryType} berries at the farm.`;
        this.questFocus = player.statistics.berriesHarvested[GameConstants.BerryType[berryType]];
    }

    // TODO: Balance the reward amount better
    private static calcReward(berryType: string, amount: number): number {
        const berry = BerryList[berryType];
        const berryId = GameConstants.BerryType[berryType];
        return Math.ceil(Math.sqrt(amount * berry.harvestTime) * GameConstants.FARM_BERRIES_BASE_REWARD);
    }
}
