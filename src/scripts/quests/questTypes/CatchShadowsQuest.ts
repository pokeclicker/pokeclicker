/// <reference path="../Quest.ts" />

import SeededRand from '../../../modules/utilities/SeededRand';

class CatchShadowsQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalShadowPokemonCaptured;
    }

    public static canComplete() {
        return App.game.statistics.totalShadowPokemonCaptured() > 1;
    }

    public static generateData(): any[] {
        const amount = SeededRand.floatBetween(0, 5);
        const reward = this.calcReward(amount) / amount;
        return [amount, reward];
    }

    private static calcReward(amount: number): number {
        const reward = Math.ceil(amount * GameConstants.SHADOW_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return this.customDescription ?? `Catch ${this.tieredAmount().toLocaleString('en-US')} Shadow Pokémon.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
