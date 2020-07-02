/// <reference path="Quest.ts" />

class DefeatDungeonQuest extends Quest implements QuestInterface {
    constructor(dungeon: string, amount: number) {
        super(amount, DefeatDungeonQuest.calcReward(dungeon, amount));
        this.description = `Defeat the ${dungeon} dungeon ${amount} times.`;
        this.questFocus = App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeon)];
    }

    private static calcReward(dungeon: string, amount: number): number {
        const playerDamage = App.game.party.calculateClickAttack() + (App.game.party.calculatePokemonAttack() / GameConstants.QUEST_CLICKS_PER_SECOND);
        const attacksToDefeatPokemon = Math.ceil(Math.min(4, dungeonList[dungeon].baseHealth / playerDamage));
        const averageTilesToBoss = 13;
        const attacksToCompleteDungeon = attacksToDefeatPokemon * averageTilesToBoss;
        const completeDungeonsReward = attacksToCompleteDungeon * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER * amount;

        let region: GameConstants.Region, route: number;
        for (region = player.highestRegion; region >= 0; region--) {
            route = QuestHelper.highestOneShotRoute(region); // returns 0 if no routes in this region can be one shot
            if (route) {
                break;
            }
        }
        if (!route) {
            route = 1, region = GameConstants.Region.kanto;
        }
        const tokens = PokemonFactory.routeDungeonTokens(route,region);
        const routeKillsPerDungeon = dungeonList[dungeon].tokenCost / tokens;
        const collectTokensReward = routeKillsPerDungeon * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * amount;

        return Math.ceil(completeDungeonsReward + collectTokensReward);
    }
}
