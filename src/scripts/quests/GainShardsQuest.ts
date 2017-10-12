/// <reference path="Quest.ts" />

class GainShardsQuest extends Quest implements QuestInterface {
    constructor(type: GameConstants.PokemonType, amount: number) {
        super(amount, GainShardsQuest.calcReward(type, amount));
        this.description = `Gain ${amount} ${GameConstants.PokemonType[type]} shards.`;
        this.questFocus = player.statistics.totalShards[type];
        this.createProgressObservables();
    }

    private static calcReward(type, amount): number {
        // Needs balancing between different types
        return amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD;
    }
}