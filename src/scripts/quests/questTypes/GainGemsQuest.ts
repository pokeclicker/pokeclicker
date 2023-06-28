/// <reference path="../Quest.ts" />

class GainGemsQuest extends Quest implements QuestInterface {
    public static maxWeight = 4;
    public static minWeight = 1.2;
    public static weights: Array<Record<string, number>> = [];

    private type: PokemonType;

    constructor(amount: number, reward: number, type: PokemonType) {
        super(amount, reward);
        this.type = type;
        this.focus = App.game.statistics.gemsGained[this.type];
    }

    public static canComplete() {
        return App.game.gems.canAccess();
    }

    public static typeWeights(): Array<Record<string, number>> {
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
        // Calculate the weight
        return types.map(v => ((-v + max) / max) * (this.maxWeight - this.minWeight))
            // map the type and rounded values
            .map((weight, type) => ({type, weight: Math.round((weight + this.minWeight) * 100) / 100}));
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(200, 600);
        this.weights = this.typeWeights();
        const type = SeededRand.fromArray(this.weights.filter(w => w.weight < this.maxWeight).map(w => w.type));
        const reward = this.calcReward(type, amount);
        return [amount, reward, type];
    }

    private static calcReward(type: PokemonType, amount: number): number {
        const reward = amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * this.weights[type].weight * 0.5;
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain ${this.amount.toLocaleString('en-US')} ${PokemonType[this.type]} gems.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.type);
        return json;
    }
}
