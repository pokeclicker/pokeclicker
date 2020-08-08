/// <reference path="../Quest.ts" />

class UsePokeballQuest extends Quest implements QuestInterface {
    constructor(pokeball: GameConstants.Pokeball, amount: number) {
        // Reward for Greatballs is 4x Pokeballs, Ultraballs are 9x Pokeballs
        super(amount, Math.ceil(amount * (pokeball + 1) * (pokeball + 1) * GameConstants.DEFEAT_POKEMONS_BASE_REWARD));
        this.description = `Use ${amount.toLocaleString('en-US')} ${GameConstants.Pokeball[pokeball]}s.`;
        this.focus = App.game.statistics.pokeballsUsed[pokeball];
    }
}
