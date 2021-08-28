/// <reference path="../Quest.ts" />

class CapturePokemonTypesQuest extends Quest implements QuestInterface {
    public static maxWeight = 4;

    constructor(capturesNeeded: number, reward: number, public type: PokemonType) {
        super(capturesNeeded, reward);
        this.focus = ko.pureComputed(() => pokemonMap.filter(p => p.type.includes(this.type)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0));
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
        const amount = SeededRand.intBetween(50, 250);
        let type = SeededRand.fromEnum(PokemonType);
        while (this.typeWeight(type) >= this.maxWeight) {
            type = SeededRand.fromEnum(PokemonType);
        }
        const reward = this.calcReward(amount, type);
        return [amount, reward, type];
    }

    private static calcReward(amount: number, type: PokemonType): number {
        const reward = amount * GameConstants.CAPTURE_POKEMONS_BASE_REWARD * this.typeWeight(type);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Capture ${this.amount.toLocaleString('en-US')} ${PokemonType[this.type]} type Pokémon.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.type);
        return json;
    }
}
