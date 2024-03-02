/// <reference path="../Quest.ts" />

class CapturePokemonsQuest extends Quest implements QuestInterface {

    constructor(capturesNeeded: number, reward: number) {
        super(capturesNeeded, reward);
        this.focus = App.game.statistics.totalPokemonCaptured;
    }

    public static generateData(): any[] {
        const amount = SeededRand.float(400) + 100;
        const reward = this.calcReward();
        return [amount, reward];
    }

    private static calcReward(): number {
        const reward = GameConstants.CAPTURE_POKEMONS_BASE_REWARD;
        return super.randomizeReward(reward);
    }

    get description(): string {
        return this.customDescription ?? `Capture or hatch ${this.tieredAmount().toLocaleString('en-US')} Pokémon.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
