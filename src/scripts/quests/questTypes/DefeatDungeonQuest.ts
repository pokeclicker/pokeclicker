/// <reference path="../Quest.ts" />

class DefeatDungeonQuest extends Quest implements QuestInterface {

    private dungeon: string;

    constructor(amount: number, reward: number, dungeon: string) {
        super(amount, reward);
        this.dungeon = dungeon;
        this.focus = App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(this.dungeon)];
    }

    public static generateData(): any[] {
        // Allow up to highest region
        const amount = SeededRand.intBetween(5, 20);
        let attempts = 0;
        let region = GameConstants.Region.kanto;
        let dungeon = GameConstants.RegionDungeons[region]['Viridian Forest'];
        // Try to find unlocked dungeon, end after 10 attempts
        do {
            region = SeededRand.intBetween(0, player.highestRegion());
            dungeon = SeededRand.fromArray(GameConstants.RegionDungeons[region]);
            console.log(`dungeon ${dungeon} unlocked ${TownList[dungeon].isUnlocked()}`);
        } while (!TownList[dungeon].isUnlocked() && ++attempts < 10);
        const reward = this.calcReward(amount, dungeon);
        return [amount, reward, dungeon];
    }

    private static calcReward(amount: number, dungeon: string): number {
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

        const reward = Math.min(5000, Math.ceil(completeDungeonsReward + collectTokensReward));
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Defeat the ${this.dungeon} dungeon ${this.amount.toLocaleString('en-US')} times.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.dungeon);
        return json;
    }
}
