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
        const amount = SeededRand.intBetween(1, 3);
        const reward = this.calcReward(amount);
        return [amount, reward];
    }

    private static calcReward(amount: number): number {
        const reward = Math.ceil(amount * GameConstants.MINE_LAYERS_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        if (this.customDescription) {
            return this.customDescription;
        }
        const suffix = this.amount > 1 ? 's' : '';
        return `Mine ${this.amount.toLocaleString('en-US')} layer${suffix} in the Underground.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
