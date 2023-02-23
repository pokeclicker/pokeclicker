/// <reference path="../Quest.ts" />

class GainTokensQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalDungeonTokens;
    }

    public static generateData(): any[] {
        const regionDungeons = GameConstants.RegionDungeons[player.highestRegion()].filter(dungeon => TownList[dungeon].isUnlocked());
        const maxDungeon = dungeonList[regionDungeons[Math.max(1,regionDungeons.length) - 1]];
        const amount = SeededRand.intBetween(1, player.highestRegion() + 2) * maxDungeon.tokenCost;
        const maxAmount = (player.highestRegion() + 2) * maxDungeon.tokenCost;
        const reward = this.calcReward(amount, maxAmount);
        return [amount, maxAmount, reward];
    }

    private static calcReward(amount: number, maxAmount: number): number {
        const maxReward = GameConstants.GAIN_TOKENS_MAX_REWARD * (player.highestRegion() + 2);
        const reward =  Math.ceil(amount / maxAmount * maxReward);
        return super.randomizeReward(reward);
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
