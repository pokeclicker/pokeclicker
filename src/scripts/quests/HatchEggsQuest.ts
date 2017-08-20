/// <reference path="Quest.ts" />

class HatchEggsQuest extends Quest implements QuestInterface {
    amount: number;

    constructor(amount: number) {
        super();
        this.description = `Hatch ${amount} Eggs`;
        this.pointsReward = amount * GameConstants.HATCH_EGGS_BASE_REWARD;
        this.xpReward = this.pointsReward / 10;
        this.amount = amount;
        this.questFocus = player._eggsHatched;
    }
}