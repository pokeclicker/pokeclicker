/// <reference path="Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {
    constructor(berryType: BerryType, amount: number) {
        super(amount, HarvestBerriesQuest.calcReward(berryType, amount));
        this.description = `Harvest ${amount} ${BerryType[berryType]} berries at the farm.`;
        this.questFocus = App.game.statistics.berriesHarvested[berryType];
    }

    // TODO: Balance the reward amount better
    private static calcReward(berryType: BerryType, amount: number): number {
        const harvestTime = App.game.farming.berryData[berryType].harvestTime;
        const avgBerriesPerHarvest = 2.5;
        const plotsAvailable = App.game.farming.unlockedPlotCount();
        return Math.ceil((amount / avgBerriesPerHarvest) * (harvestTime / Math.max(4, plotsAvailable)));
    }
}
