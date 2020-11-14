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
        const plantAmt = amount / harvestAmt;
        const plantCycles = plantAmt / App.game.farming.plotList.filter(plot => plot.isUnlocked).length;
        const totalPlantTime = plantCycles * harvestTime;
        const scaled = totalPlantTime * 10 / (berryType + 1);
        return Math.ceil(scaled);
    }
}
