/// <reference path="Quest.ts" />

class CatchShiniesQuest extends Quest implements QuestInterface {
    constructor(amount: number) {
        super(amount, Math.ceil(amount * GameConstants.SHINY_BASE_REWARD));
        this.description = `Catch ${amount} shiny pokemon.`;
        this.questFocus = App.game.statistics.totalShinyPokemonCaptured;
    }
}
