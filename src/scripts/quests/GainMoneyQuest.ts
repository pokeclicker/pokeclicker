/// <reference path="Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {
    amount: number;

    constructor(index: number, amount: number) {
        super(index);
        this.description = `Gain ${amount} PokeDollars`;
        this.pointsReward = amount * GameConstants.GAIN_MONEY_BASE_REWARD;
        this.xpReward = this.pointsReward / 10;
        this.amount = amount;
        this.questFocus = player._money;
        this.createProgressObservables();
    }
}