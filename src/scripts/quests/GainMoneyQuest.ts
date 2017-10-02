/// <reference path="Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {
    constructor(amount: number) {
        super(amount, Math.ceil(amount * GameConstants.GAIN_MONEY_BASE_REWARD));
        this.description = `Gain ${amount} PokeDollars`;
        this.questFocus = player.statistics.totalMoney;
        this.createProgressObservables();
    }
}