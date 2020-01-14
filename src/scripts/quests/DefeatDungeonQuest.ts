/// <reference path="Quest.ts" />

class DefeatDungeonQuest extends Quest implements QuestInterface {
    constructor(name: DungeonName, amount: number) {
        super(amount, DefeatDungeonQuest.calcReward(name, amount));
        this.description = `Clear the ${GameConstants.humanifyString(DungeonName[name])} dungeon ${amount} times.`;
        this.questFocus = player.statistics.dungeonsCleared[name];
    }

    private static calcReward(name: DungeonName, amount: number): number {
        const playerDamage = App.game.party.calculateClickAttack();
        const attacksToDefeatPokemon = Math.min(4, App.game.world.getDungeon(name).baseHealth / playerDamage);
        // Average tiles till boss ~= 13
        return Math.ceil(attacksToDefeatPokemon * 13 * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER * amount);
    }
}
