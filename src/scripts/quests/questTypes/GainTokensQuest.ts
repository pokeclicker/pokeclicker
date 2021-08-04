/// <reference path="../Quest.ts" />

class GainTokensQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalDungeonTokens;
    }

    public static generateData(): any[] {
        const multiplier = Math.pow(player.highestRegion() + 1, 3);
        const amount = SeededRand.intBetween(1000 * multiplier, 8000 * multiplier);
        const reward = this.calcReward(amount);
        return [amount, reward];
    }

    private static calcReward(amount: number): number {
        const reward =  Math.ceil((amount * GameConstants.GAIN_TOKENS_BASE_REWARD) / Math.pow(player.highestRegion() + 1, 2.6));
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain ${this.amount.toLocaleString('en-US')} dungeon tokens.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        return json;
    }
}
