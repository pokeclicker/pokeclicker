/// <reference path="../Quest.ts" />

class GainTokensQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalDungeonTokens;
    }

    public static generateData(): any[] {
        let dungeonCount = 0;
        const rawAmount = 1500 + Object.values(dungeonList).reduce((max, dungeon) => {
            if (App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(dungeon.name)]()) {
                dungeonCount++;
                return Math.max(max, dungeon.tokenCost);
            }
            return max;
        }, 0) / 10;
        const baseAmount = Math.floor(rawAmount * (2 + dungeonCount / 20));
        //const amount = SeededRand.intBetween(baseAmount, baseAmount * 3);
        const amount = baseAmount;
        const reward = this.calcReward(amount, rawAmount);
        return [amount, reward];
    }

    private static calcReward(amount: number, rawAmount: number): number {
        const reward =  Math.ceil(amount / rawAmount * GameConstants.GAIN_TOKENS_BASE_REWARD);
        return reward; //super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain ${this.amount.toLocaleString('en-US')} Dungeon Tokens.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
