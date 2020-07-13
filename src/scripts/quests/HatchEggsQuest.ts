/// <reference path="Quest.ts" />

class HatchEggsQuest extends Quest implements QuestInterface {
    constructor(amount: number) {
        super(amount, Math.ceil(amount * GameConstants.HATCH_EGGS_BASE_REWARD));
        this.description = `Hatch ${amount.toLocaleString('en-US')} Eggs.`;
        this.questFocus = App.game.statistics.hatchedEggs;
    }
}
