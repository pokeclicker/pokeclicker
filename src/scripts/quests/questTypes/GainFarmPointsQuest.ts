/// <reference path="../Quest.ts" />

class GainFarmPointsQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalFarmPoints;
    }

    public static canComplete() {
        return App.game.farming.canAccess();
    }

    public static generateData(): any[] {
        const amount = SeededRand.float(4500) + 500;
        const reward = this.calcReward();
        return [amount, reward];
    }

    private static calcReward(): number {
        const reward = Math.ceil(GameConstants.GAIN_FARM_POINTS_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return this.customDescription ?? `Gain ${this.tieredAmount().toLocaleString('en-US')} Farm Points.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
