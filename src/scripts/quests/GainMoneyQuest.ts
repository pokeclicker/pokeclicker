/// <reference path="Quest.ts" />

class GainMoneyQuest extends Quest implements QuestInterface {
    amount: number;

    constructor(amount: number) {
        super();
        this.description = `Gain ${amount} PokeDollars`;
        this.pointsReward = amount * GameConstants.GAIN_MONEY_BASE_REWARD;
        this.xpReward = this.pointsReward / 10;
        this.amount = amount;
    }

    beginQuest() {
        let initial = player.money;
        this.progress = ko.computed(function() {
            return Math.min(1, (player.money - initial) / this.amount);
        }, this);
        this.isCompleted = ko.computed(function() {
            return this.progress() == 1;
        }, this);
    }
}