/// <reference path="../Quest.ts" />

class GainShardsQuest extends Quest implements QuestInterface {

    private type: PokemonType;

    constructor(amount: number, reward: number, type: PokemonType) {
        super(amount, reward);
        this.type = type;
        this.focus = App.game.statistics.shardsGained[this.type];
    }

    public static generateData(): any[] {
        const possibleTypes = [
            PokemonType.Normal,
            PokemonType.Poison,
            PokemonType.Water,
            PokemonType.Grass,
            PokemonType.Flying,
            PokemonType.Fire,
            PokemonType.Fighting,
        ];
        const type = SeededRand.fromArray(possibleTypes);
        const amount = SeededRand.intBetween(200, 600);
        const reward = this.calcReward(type, amount);
        return [amount, reward, type];
    }

    private static calcReward(type: PokemonType, amount: number): number {
        // Needs balancing between different types
        const reward = amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD;
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain ${this.amount.toLocaleString('en-US')} ${PokemonType[this.type]} shards.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.type);
        return json;
    }
}
