/// <reference path="../Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {
    constructor(berryType: BerryType, amount: number) {
        super(amount, HarvestBerriesQuest.calcReward(berryType, amount));
        this.description = `Harvest ${amount.toLocaleString('en-US')} ${BerryType[berryType]} berries at the farm.`;
        this.focus = App.game.statistics.berriesHarvested[berryType];
    }

    private static calcReward(berryType: BerryType, amount: number): number {
        const harvestTime = App.game.farming.berryData[berryType].growthTime[3];
        const harvestAmt = App.game.farming.berryData[berryType].harvestAmount;
        return Math.ceil((amount / harvestAmt) * harvestTime / 50);
    }
}
