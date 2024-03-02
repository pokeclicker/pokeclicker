/// <reference path="../Quest.ts" />

class MineLayersQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.undergroundLayersMined;
    }

    public static canComplete() {
        return App.game.underground.canAccess();
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(100, 300) / 100;
        const reward = this.calcReward();
        return [amount, reward];
    }

    private static calcReward(): number {
        const reward = Math.ceil(GameConstants.MINE_LAYERS_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        if (this.customDescription) {
            return this.customDescription;
        }
        const suffix = this.tieredAmount() > 1 ? 's' : '';
        return `Mine ${this.tieredAmount().toLocaleString('en-US')} layer${suffix} in the Underground.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
