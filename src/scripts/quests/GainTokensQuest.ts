/// <reference path="Quest.ts" />

class GainTokensQuest extends Quest implements QuestInterface {
    constructor(amount: number) {
        super(amount, Math.ceil(amount * GameConstants.GAIN_TOKENS_BASE_REWARD));
        this.description = `Gain ${amount} dungeon tokens.`;
        this.questFocus = App.game.statistics.totalDungeonTokens;
    }
}