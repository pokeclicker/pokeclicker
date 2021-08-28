/// <reference path="../Quest.ts" />

class GainShardsQuest extends Quest implements QuestInterface {
    public static maxWeight = 4;

    private type: PokemonType;

    constructor(amount: number, reward: number, type: PokemonType) {
        super(amount, reward);
        this.type = type;
        this.focus = App.game.statistics.shardsGained[this.type];
    }

    public static typeWeight(type: PokemonType): number {
        const types = new Array(GameHelper.enumLength(PokemonType) - 1).fill(0);
        Routes.regionRoutes.filter(r => r.isUnlocked()).forEach(r => {
            Object.values(r.pokemon).flat().forEach(p => {
                const pokemon = pokemonMap[p];
                if (!pokemon || pokemon.id <= 0) {
                    return;
                }
                pokemon.type.forEach(t => types[t]++);
            });
        });
        const max = Math.max(...types);
        return types.map(v => (-v + max) / max * this.maxWeight).map((v, i) => Math.max(1.2, Math.round(v * 100) / 100))[type];
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(200, 600);
        let type = SeededRand.fromEnum(PokemonType);
        while (this.typeWeight(type) >= this.maxWeight) {
            type = SeededRand.fromEnum(PokemonType);
        }
        const reward = this.calcReward(type, amount);
        return [amount, reward, type];
    }

    private static calcReward(type: PokemonType, amount: number): number {
        const reward = amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * this.typeWeight(type);
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
