/// <reference path="Quest.ts" />

class DefeatGymQuest extends Quest implements QuestInterface {
    constructor(name: GymLeaderName, amount: number) {
        super(amount, DefeatGymQuest.calcReward(name, amount));
        this.description = DefeatGymQuest.getDescription(name, amount);
        this.questFocus = player.statistics.gymsDefeated[name];
    }

    private static getDescription(name: GymLeaderName, amount: number): string {
        return `Defeat ${GameConstants.humanifyString(GymLeaderName[name])} ${amount} times.`;
    }

    private static calcReward(name: GymLeaderName, amount: number): number {
        const gym: Gym = App.game.world.getGym(name);
        if (gym instanceof Champion) {
            gym.setPokemon(player.starter);
        }
        const playerDamage = App.game.party.calculatePokemonAttack();
        let attacksToWin = 0;
        for (const pokemon of gym.pokemons) {
            attacksToWin += Math.ceil( Math.min( 4, pokemon.maxHealth / Math.max(1, playerDamage) ) );
        }
        return Math.ceil(attacksToWin * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER * amount);
    }
}
