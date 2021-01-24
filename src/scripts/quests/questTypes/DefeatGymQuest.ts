/// <reference path="../Quest.ts" />

class DefeatGymQuest extends Quest implements QuestInterface {

    private gymTown: string;

    constructor(amount: number, reward: number, gymTown: string) {
        super(amount, reward);
        this.gymTown = gymTown;
        this.focus = App.game.statistics.gymsDefeated[GameConstants.getGymIndex(this.gymTown)];
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(5, 20);
        let attempts = 0;
        let region = GameConstants.Region.kanto;
        let gymTown = GameConstants.RegionGyms[region][0];
        // Try to find unlocked gym, end after 10 attempts
        do {
            region = SeededRand.intBetween(0, player.highestRegion());
            gymTown = SeededRand.fromArray(GameConstants.RegionGyms[region]);
        } while (!Gym.isUnlocked(gymList[gymTown]) && ++attempts < 10);

        const reward = this.calcReward(amount, gymTown);
        return [amount, reward, gymTown];
    }

    private static calcReward(amount: number, gymTown: string): number {
        const gym = gymList[gymTown];
        if (gym instanceof Champion) {
            gym.setPokemon(player.starter());
        }
        const playerDamage = App.game.party.calculatePokemonAttack();
        let attacksToWin = 0;
        for (const pokemon of gym.pokemons) {
            attacksToWin += Math.ceil( Math.min( 4, pokemon.maxHealth / Math.max(1, playerDamage) ) );
        }
        const reward = Math.min(5000, Math.ceil(attacksToWin * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER * amount));
        return super.randomizeReward(reward);
    }

    get description(): string {
        const desc = [];
        desc.push(`Defeat ${this.gymTown}`);
        if (!this.gymTown.includes('Elite') && !this.gymTown.includes('Champion')) {
            desc.push('gym');
        }
        desc.push(`${this.amount.toLocaleString('en-US')} times.`);
        return desc.join(' ');
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.gymTown);
        return json;
    }
}
