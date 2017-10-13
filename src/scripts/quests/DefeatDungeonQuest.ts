/// <reference path="Quest.ts" />

class DefeatDungeonQuest extends Quest implements QuestInterface {
    constructor(dungeonIndex: number, region, amount: number) {
        let dungeon;
        switch (region) {
            case 0:
                dungeon = GameConstants.KantoDungeons[dungeonIndex];
                break;
            case 1:
                dungeon = GameConstants.JohtoDungeons[dungeonIndex];
                break;
        }
        super(amount, DefeatDungeonQuest.calcReward(dungeon, amount));
        this.description = `Defeat the ${dungeon} dungeon ${amount} times.`;
        this.questFocus = player.statistics.dungeonsCleared[dungeonIndex];
        this.createProgressObservables();
    }

    private static calcReward(dungeon: string, amount: number): number {
        let playerDamage = player.pokemonAttackObservable();
        let attacksToDefeatPokemon = Math.ceil(dungeonList[dungeon].baseHealth / playerDamage);
        //Average tiles till boss ~= 13
        return Math.ceil(attacksToDefeatPokemon * 13 * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER);
    }
}