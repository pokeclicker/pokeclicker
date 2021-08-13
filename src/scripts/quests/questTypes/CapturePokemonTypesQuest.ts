/// <reference path="../Quest.ts" />

class CapturePokemonTypesQuest extends Quest implements QuestInterface {

    constructor(capturesNeeded: number, reward: number, public type: PokemonType) {
        super(capturesNeeded, reward);
        this.focus = ko.pureComputed(() => pokemonMap.filter(p => p.type.includes(this.type)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0));
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(100, 500);
        const reward = this.calcReward(amount);
        const type = SeededRand.fromEnum(PokemonType);
        return [amount, reward, type];
    }

    private static calcReward(amount: number): number {
        const reward = amount * GameConstants.CAPTURE_POKEMONS_BASE_REWARD * 1.2;
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
