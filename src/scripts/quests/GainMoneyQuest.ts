/// <reference path="Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {
    amount: number;

    constructor(amount: number) {
        super();
        this.description = `Gain ${amount} PokeDollars`;
        this.pointsReward = amount * GameConstants.GAIN_MONEY_BASE_REWARD;
        this.xpReward = this.pointsReward / 10;
        this.amount = amount;
        this.questFocus = player._money;
    }
}