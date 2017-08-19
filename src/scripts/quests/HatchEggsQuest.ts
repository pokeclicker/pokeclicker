/// <reference path="Quest.ts" />

class HatchEggQuest extends Quest implements QuestInterface {
    amount: number;

    constructor(amount: number) {
        super();
        this.description = `Hatch ${amount} Eggs`;
        this.pointsReward = amount * GameConstants.HATCH_EGGS_BASE_REWARD;
        this.xpReward = this.pointsReward / 10;
        this.amount = amount;
    }

    beginQuest() {
        let initial = player.eggsHatched;
        this.progress = ko.computed(function() {
            return Math.min(1, (player.eggsHatched - initial) / this.amount);
        }, this);
        this.isCompleted = ko.computed(function() {
            return this.progress() == 1;
        }, this);
    }
}