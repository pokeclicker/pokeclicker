/// <reference path="../Quest.ts" />

class CapturePokemonTypesQuest extends Quest implements QuestInterface {

    constructor(capturesNeeded: number, reward: number, public type: PokemonType) {
        super(capturesNeeded, reward);
        this.focus = ko.pureComputed(() => pokemonMap.filter(p => p.type.includes(this.type)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0));
    }

    public static rewardWeight: Record<PokemonType, number> = {
        [PokemonType.None]:     0,
        [PokemonType.Normal]:   1.4,
        [PokemonType.Fire]:     2,
        [PokemonType.Water]:    1.4,
        [PokemonType.Electric]: 2,
        [PokemonType.Grass]:    2,
        [PokemonType.Ice]:      4,
        [PokemonType.Fighting]: 1.4,
        [PokemonType.Poison]:   1.4,
        [PokemonType.Ground]:   2,
        [PokemonType.Flying]:   1.4,
        [PokemonType.Psychic]:  4,
        [PokemonType.Bug]:      3,
        [PokemonType.Rock]:     2,
        [PokemonType.Ghost]:    4,
        [PokemonType.Dragon]:   5,
        [PokemonType.Dark]:     3,
        [PokemonType.Steel]:    3,
        [PokemonType.Fairy]:    5,
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(50, 250);
        const type = SeededRand.fromEnum(PokemonType);
        const reward = this.calcReward(amount, type);
        return [amount, reward, type];
    }

    private static calcReward(amount: number, type: PokemonType): number {
        const reward = amount * GameConstants.CAPTURE_POKEMONS_BASE_REWARD * this.rewardWeight[type];
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
