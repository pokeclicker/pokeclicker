/// <reference path="../Quest.ts" />

class BuyPokeballsQuest extends Quest implements QuestInterface {
    constructor(amount: number, pokeball: GameConstants.Pokeball, reward: number) {
        super(amount, reward);
        this.description = `Buy ${amount.toLocaleString('en-US')} ${GameConstants.Pokeball[pokeball]}s.`;
        this.focus = App.game.statistics.pokeballsBought[pokeball];
    }
}
