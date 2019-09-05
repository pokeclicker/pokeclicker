/// <reference path="Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {
    constructor(berryType: string, amount: number) {
        super(amount, HarvestBerriesQuest.calcReward(berryType, amount));
        this.description = `Harvest ${amount} ${berryType} berries at the farm.`;
        this.questFocus = player.statistics.berriesHarvested[GameConstants.BerryType[berryType]];
    }

    // TODO: Balance the reward amount better
    private static calcReward(berryType: string, amount: number): number {
        const { harvestTime } = BerryList[berryType];
        const avgBerriesPerHarvest = 2.5;
        const plotsAvailable = player.plotList.filter(plot=>plot().isUnlocked()).length;
        return Math.ceil((amount / avgBerriesPerHarvest) * (harvestTime / Math.max(4, plotsAvailable)));
    }
}
