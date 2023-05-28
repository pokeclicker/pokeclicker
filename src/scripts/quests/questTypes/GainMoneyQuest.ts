/// <reference path="../Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalMoney;
    }

    public static generateData(): any[] {
        const highestRegion = player.highestRegion();
        const badgeCount = App.game.badgeCase.badgeCount();
        const minMoneyReward = 10000;
        let rawAmount = Object.values(GymList).reduce((max, gym) => {
            if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gym.town)]()) {
                // 1.3 raised to variable power so we account for earlier gym being easier and better for money (Blue and Diantha).
                return Math.max(max, (minMoneyReward + gym.moneyReward) * 1.3 ** (highestRegion - GameConstants.getGymRegion(gym.town)));
            }
            return max;
        }, minMoneyReward);
        const baseAmount = rawAmount * (1 + badgeCount / 10);
        //const amount = SeededRand.intBetween(moneyReward, moneyReward * 3);
        let amount = baseAmount;
        const reward = this.calcReward(amount, rawAmount);
        // Achievement bonus accounted after reward calculation.
        amount *= (2 + highestRegion) / 2;
        return [amount, reward];
    }

    private static calcReward(amount: number, rawAmount: number): number {
        const reward = Math.ceil(amount / rawAmount * GameConstants.GAIN_MONEY_BASE_REWARD);
        return reward; //super.randomizeReward(reward);
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
