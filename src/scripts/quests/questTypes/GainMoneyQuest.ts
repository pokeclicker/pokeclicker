/// <reference path="../Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalMoney;
    }

    public static generateData(): any[] {
        const highestRegion = player.highestRegion();
        const gymAmount = Object.values(GymList).reduce((max, gym) => {
            if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gym.town)]()) {
                // 1.3 raised to variable power so we account for gyms from early regions being easier and better for money.
                return Math.max(max, (gym.moneyReward) * 1.3 ** (highestRegion - GameConstants.getGymRegion(gym.town)));
            }
            return max;
        }, 0) || GymList[GameConstants.KantoGyms[0]].moneyReward;
        const baseAmount = gymAmount * (1 + highestRegion) * 2;
        const maxAmount = Math.ceil(baseAmount * (3 + highestRegion));
        const amount = SeededRand.intBetween(baseAmount, maxAmount);
        const reward = GainMoneyQuest.calcReward(amount, baseAmount);
        return [amount, reward];
    }

    private static calcReward(amount: number, baseAmount: number): number {
        const reward = Math.ceil(amount / baseAmount * GameConstants.GAIN_MONEY_BASE_REWARD);
        return GainMoneyQuest.randomizeReward(reward);
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
