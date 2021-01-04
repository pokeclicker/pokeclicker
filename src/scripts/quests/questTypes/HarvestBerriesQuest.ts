/// <reference path="../Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {

    private berryType: BerryType;

    constructor(amount: number, reward: number, berryType: BerryType) {
        super(amount, reward);
        this.berryType = berryType;
        this.focus = App.game.statistics.berriesHarvested[this.berryType];
    }

    public static generateData(): any[] {
        const berryRegionBound = Farming.genBounds[Math.min(player.highestRegion(), GameConstants.Region.unova)];
        // Getting Berries that can be grown in less than half a day
        const berryTypes = GameHelper.enumNumbers(BerryType).filter(berry => {
            // Needs to be a berry that can be planted
            return berry != BerryType.None
            // Need to be able obtain within our highest region
            && berry < berryRegionBound
            // Needs to take less than 6 hours to fully grow
            && App.game.farming.berryData[berry].growthTime[3] < 6 * 60 * 60;
        });

        const berryType = SeededRand.fromArray(berryTypes);
        // Calculating balanced amount based on BerryType
        // Hard limits are between 10 and 300
        // Additional limits based on growing on all 25 plots non-stop in 3 hours
        const minAmt = 30;
        let maxAmt = 300;

        const totalGrowths = Math.floor((3 * 60 * 60 * 25) / App.game.farming.berryData[berryType].growthTime[3]);
        const totalBerries = totalGrowths * App.game.farming.berryData[berryType].harvestAmount;
        maxAmt = Math.min(maxAmt, totalBerries);

        const amount = SeededRand.intBetween(minAmt, maxAmt);
        const reward = this.calcReward(amount, berryType);
        return [amount, reward, berryType];
    }

    private static calcReward(amount: number, berryType: BerryType): number {
        const harvestTime = App.game.farming.berryData[berryType].growthTime[3];
        const harvestAmt = App.game.farming.berryData[berryType].harvestAmount;
        const plantAmt = amount / harvestAmt;
        const plantCycles = plantAmt / App.game.farming.plotList.filter(plot => plot.isUnlocked).length;
        const totalPlantTime = plantCycles * harvestTime;
        const scaled = totalPlantTime * 10 / (berryType + 1);
        const reward = Math.ceil(scaled);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Harvest ${this.amount.toLocaleString('en-US')} ${BerryType[this.berryType]} berries at the farm.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.berryType);
        return json;
    }
}
