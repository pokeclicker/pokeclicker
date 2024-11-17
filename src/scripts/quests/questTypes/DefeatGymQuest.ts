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
        if (this.region == GameConstants.Region.none) {
            throw new Error(`Invalid gym town for quest: ${this.gymTown}`);
        }
        this.focus = App.game.statistics.gymsDefeated[GameConstants.getGymIndex(this.gymTown)];
    }

    // Only add Defeat Gym Quest if the player has defeated the first gym (Brock).
    public static canComplete() {
        return App.game.badgeCase.hasBadge(BadgeEnums.Boulder);
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(5, 20);
        let maxRegion = player.highestRegion();
        // Check if first gym of highest region has been cleared. If not, pick one region lower than highest.
        if (!App.game.badgeCase.hasBadge(GymList[GameConstants.RegionGyms[player.highestRegion()][0]].badgeReward)) {
            maxRegion -= 1;
        }
        const region = SeededRand.intBetween(0, maxRegion);
        // Only use cleared gyms.
        const possibleGyms = GameConstants.RegionGyms[region].filter(gymTown => GymList[gymTown].flags.quest && GymList[gymTown].clears());
        const gymTown = SeededRand.fromArray(possibleGyms);
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
        if (this.customDescription) {
            return this.customDescription;
        }
        const elite = this.gymTown.includes('Elite') || this.gymTown.includes('Champion');
        const displayName = GymList[this.gymTown]?.displayName;
        const leaderName = GymList[this.gymTown].leaderName.replace(/\d+/g, '').trim();
        const { region, subRegion } = GymList[this.gymTown].parent;
        const subRegionName = SubRegions.getSubRegionById(region, subRegion).name;

        let gymString;
        if (displayName) {
            gymString = displayName;
            if (displayName.includes('Trial')) {
                gymString += ` at ${this.gymTown}`;
            }
        } else if (elite) {
            gymString = this.gymTown;
        } else {
            gymString = `${leaderName}'s Gym at ${this.gymTown}`;
        }

        return `Defeat ${gymString} in ${subRegionName} ${this.amount.toLocaleString('en-US')} times.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.gymTown);
        return json;
    }
}
