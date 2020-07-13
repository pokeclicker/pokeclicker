/// <reference path="Quest.ts" />

class GainShardsQuest extends Quest implements QuestInterface {
    constructor(type: PokemonType, amount: number) {
        super(amount, GainShardsQuest.calcReward(type, amount));
        this.description = `Gain ${amount.toLocaleString('en-US')} ${PokemonType[type]} shards.`;
        this.questFocus = App.game.statistics.totalShards[type];
    }

    private static calcReward(type, amount): number {
        // Needs balancing between different types
        return amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD;
    }
}
