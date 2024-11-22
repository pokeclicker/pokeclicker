/// <reference path="../Quest.ts" />

class GainTokensQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalDungeonTokens;
    }

    public static generateData(): any[] {
        const highestRegion = player.highestRegion();
        const dungeonAmount = Object.values(dungeonList).reduce((max, dungeon) => {
            if (App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(dungeon.name)]()) {
                return Math.max(max, dungeon.tokenCost);
            }
            return max;
        }, 0) || dungeonList[GameConstants.KantoDungeons[0]].tokenCost;
        const baseAmount = dungeonAmount;
        const maxAmount = Math.ceil(baseAmount * (3 + highestRegion));
        const amount = SeededRand.intBetween(baseAmount, maxAmount);
        const reward = GainTokensQuest.calcReward(amount, baseAmount);
        return [amount, reward];
    }

    private static calcReward(amount: number, baseAmount: number): number {
        const reward =  Math.ceil(amount / baseAmount * GameConstants.GAIN_TOKENS_BASE_REWARD);
        return GainTokensQuest.randomizeReward(reward);
    }

    get defaultDescription(): string {
        return `Gain ${this.amount.toLocaleString('en-US')} Dungeon Tokens.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
