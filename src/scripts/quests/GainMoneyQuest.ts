/// <reference path="Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {
    constructor(amount: number) {
        super(amount, Math.ceil(amount * GameConstants.GAIN_MONEY_BASE_REWARD));
        this.description = `Gain ${amount.toLocaleString('en-US')} PokeDollars.`;
        this.questFocus = App.game.statistics.totalMoney;
    }
}
