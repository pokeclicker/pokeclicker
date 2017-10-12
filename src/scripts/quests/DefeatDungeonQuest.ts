/// <reference path="Quest.ts" />

class DefeatDungeonQuest extends Quest implements QuestInterface {
    constructor(dungeonIndex: number, amount: number) {
        super(amount, DefeatDungeonQuest.calcReward(dungeonIndex, amount));
        let dungeon = GameConstants.Dungeons[dungeonIndex];
        this.description = `Defeat the ${dungeon} dungeon ${amount} times.`;
        this.questFocus = player.statistics.dungeonsCleared[dungeonIndex];
        this.createProgressObservables();
    }

    private static calcReward(dungeonIndex: number, amount: number): number {
        let dungeon = GameConstants.Dungeons[dungeonIndex];
        let playerDamage = player.pokemonAttackObservable();
        let attacksToDefeatPokemon = Math.ceil(dungeonList[dungeon].baseHealth / playerDamage);
        //Average tiles till boss ~= 13
        return Math.ceil(attacksToDefeatPokemon * 13 * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER);
    }
}