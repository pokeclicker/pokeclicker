/// <reference path="Quest.ts" />

class MineLayersQuest extends Quest implements QuestInterface {
    constructor(amount: number) {
        super(amount, Math.ceil(amount * GameConstants.MINE_LAYERS_BASE_REWARD));
        this.description = `Mine ${amount} layers in the underground.`;
        this.questFocus = App.game.statistics.digDeeper;
    }
}