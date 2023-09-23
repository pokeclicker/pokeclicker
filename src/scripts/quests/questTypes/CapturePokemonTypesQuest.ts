/// <reference path="../Quest.ts" />

class CapturePokemonTypesQuest extends Quest implements QuestInterface {
    public static maxWeight = 4;
    public static minWeight = 1.2;
    public static weights: Array<Record<string, number>> = [];

    constructor(capturesNeeded: number, reward: number, public type: PokemonType) {
        super(capturesNeeded, reward);
        this.focus = ko.pureComputed(() => pokemonMap.filter(p => p.type.includes(this.type)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0));
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
        const amount = SeededRand.intBetween(50, 250);
        this.weights = this.typeWeights();
        const type = SeededRand.fromArray(this.weights.filter(w => w.weight < this.maxWeight).map(w => w.type));
        const reward = this.calcReward(amount, type);
        return [amount, reward, type];
    }

    private static calcReward(amount: number, type: PokemonType): number {
        const reward = amount * GameConstants.CAPTURE_POKEMONS_BASE_REWARD * this.weights[type].weight * 2;
        return super.randomizeReward(reward);
    }

    get description(): string {
        return this.customDescription ?? `Capture or hatch ${this.amount.toLocaleString('en-US')} ${PokemonType[this.type]}-type Pokémon.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.type);
        return json;
    }
}
