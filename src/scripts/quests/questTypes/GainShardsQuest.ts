/// <reference path="../Quest.ts" />

class GainShardsQuest extends Quest implements QuestInterface {

    private type: PokemonType;

    constructor(amount: number, reward: number, type: PokemonType) {
        super(amount, reward);
        this.type = type;
        this.focus = App.game.statistics.shardsGained[this.type];
    }

    public static rewardWeight: Record<PokemonType, number> = {
        [PokemonType.None]:     0,
        [PokemonType.Normal]:   1,
        [PokemonType.Fire]:     2,
        [PokemonType.Water]:    1,
        [PokemonType.Electric]: 2,
        [PokemonType.Grass]:    2,
        [PokemonType.Ice]:      4,
        [PokemonType.Fighting]: 1,
        [PokemonType.Poison]:   1,
        [PokemonType.Ground]:   2,
        [PokemonType.Flying]:   1,
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
        const type = SeededRand.fromArray(GameHelper.createArray(1, GameHelper.enumLength(PokemonType) - 1, 1));
        const amount = SeededRand.intBetween(200, 600);
        const reward = this.calcReward(type, amount);
        return [amount, reward, type];
    }

    private static calcReward(type: PokemonType, amount: number): number {
        const reward = amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * this.rewardWeight[type];
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
