/// <reference path="Quest.ts" />

class BuyPokeballsQuest extends Quest implements QuestInterface {
    constructor(amount: number, ball: GameConstants.Pokeball, reward: number) {
        super(amount, reward);
        this.description = `Buy ${amount} Pokeballs.`;
        this.questFocus = App.game.statistics.pokeballsBought[ball];
    }
}