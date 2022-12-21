/// <reference path="../Quest.ts" />

class DefeatGymQuest extends Quest implements QuestInterface {
    private region: GameConstants.Region;

    constructor(
        amount: number,
        reward: number,
        public gymTown: string
    ) {
        super(amount, reward);
        this.region = GameConstants.getGymRegion(this.gymTown);
        this.focus = App.game.statistics.gymsDefeated[GameConstants.getGymIndex(this.gymTown)];
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(5, 20);
        const region = SeededRand.intBetween(0, player.highestRegion());
        // Only use unlocked gyms
        const possibleGyms = GameConstants.RegionGyms[region].filter(gymTown => GymList[gymTown].flags.quest && GymList[gymTown].isUnlocked());
        // If no gyms unlocked in this region, just use the first gym of the region
        const gymTown = possibleGyms.length ? SeededRand.fromArray(possibleGyms) : GameConstants.RegionGyms[region][0];
        const reward = this.calcReward(amount, gymTown);
        return [amount, reward, gymTown];
    }

    private static calcReward(amount: number, gymTown: string): number {
        const gym = GymList[gymTown];
        const playerDamage = App.game.party.pokemonAttackObservable();
        let attacksToWin = 0;
        for (const pokemon of gym.getPokemonList()) {
            attacksToWin += Math.ceil( Math.min( 4, pokemon.maxHealth / Math.max(1, playerDamage) ) );
        }
        const reward = Math.min(5000, Math.ceil(attacksToWin * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER * amount));
        return super.randomizeReward(reward);
    }

    get description(): string {
        const elite = this.gymTown.includes('Elite') || this.gymTown.includes('Champion');
        const displayName = GymList[this.gymTown]?.displayName;
        const leaderName = GymList[this.gymTown].leaderName.replace(/\d/g, '');
        const desc = [];

        desc.push('Defeat');
        if (displayName?.includes('Trial')) {
            desc.push(`${displayName} at ${this.gymTown}`);
        } else if (displayName || elite) {
            desc.push(displayName ?? this.gymTown);
        } else {
            desc.push(`${leaderName}'s Gym at ${this.gymTown}`);
        }
        desc.push(`in ${GameConstants.camelCaseToString(GameConstants.Region[this.region])}`);
        desc.push(`${this.amount.toLocaleString('en-US')} times.`);
        return desc.join(' ');
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.gymTown);
        return json;
    }
}
