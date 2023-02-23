/// <reference path="../Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalMoney;
    }

    public static generateData(): any[] {
        const availableGyms = GameConstants.RegionGyms[player.highestRegion()].filter(x => App.game.badgeCase.hasBadge(GymList[x].badgeReward));
        const maxGym = GymList[availableGyms[Math.max(1,availableGyms.length) - 1]];
        const amount = SeededRand.intBetween(1, player.highestRegion() + 2) * maxGym.moneyReward * GameConstants.GAIN_MONEY_BASE_MODIFIER;
        const maxAmount = (player.highestRegion() + 2) * maxGym.moneyReward * GameConstants.GAIN_MONEY_BASE_MODIFIER;
        const reward = this.calcReward(amount, maxAmount);
        return [amount, maxAmount, reward];
    }

    private static calcReward(amount: number, maxAmount: number): number {
        const maxReward = GameConstants.GAIN_MONEY_MAX_REWARD * (player.highestRegion() + 2);
        const reward =  Math.ceil(amount / maxAmount * maxReward);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain ${this.amount.toLocaleString('en-US')} Pokédollars.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
