/// <reference path="../Quest.ts" />

class HarvestBerriesQuest extends Quest implements QuestInterface {

    private berryType: BerryType;

    constructor(amount: number, reward: number, berryType: BerryType) {
        super(amount, reward);
        this.berryType = berryType;
        this.focus = App.game.statistics.berriesHarvested[this.berryType];
    }

    public static canComplete() {
        return App.game.farming.canAccess();
    }

    public static generateData(): any[] {
        // Getting available Berries (always include Gen 1 Berries)
        const availableBerries = App.game.farming.berryData.filter(berry => (App.game.farming.unlockedBerries[berry.type]() && berry.growthTime[3] < 12000) || berry.type < BerryType.Persim);
        const berry = SeededRand.fromArray(availableBerries);

        const maxAmt = Math.min(300, Math.ceil(432000 / berry.growthTime[3]));
        const minAmt = Math.min(10, Math.ceil(maxAmt / 2));

        const amount = SeededRand.intBetween(minAmt, maxAmt);
        const reward = this.calcReward(amount, berry.type);
        return [amount, reward, berry.type];
    }

    private static calcReward(amount: number, berryType: BerryType): number {
        const harvestTime = App.game.farming.berryData[berryType].growthTime[3];
        const harvestAmt = Math.max(4, Math.ceil(App.game.farming.berryData[berryType].harvestAmount / 2));
        const plantAmt = amount / harvestAmt;
        const fieldAmt = plantAmt / App.game.farming.plotList.length;
        const reward = Math.ceil(fieldAmt * Math.pow(harvestTime, .7) * 30);
        return super.randomizeReward(reward);
    }

    get defaultDescription(): string {
        return `Harvest ${this.amount.toLocaleString('en-US')} ${BerryType[this.berryType]} ${GameConstants.pluralizeString('Berry', this.amount)} at the farm.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.berryType);
        return json;
    }
}
