/// <reference path="../Quest.ts" />

class HatchEggsQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.totalPokemonHatched;
    }

    public static canComplete() {
        return App.game.breeding.canAccess();
    }

    public static generateData(): any[] {
        const highestRegion = player.highestRegion();
        const amount = SeededRand.intBetween(1, (10 + (5 * highestRegion)));
        const reward = this.calcReward(amount);
        return [amount, reward];
    }

    private static calcReward(amount: number): number {
        const reward = Math.ceil(amount * GameConstants.HATCH_EGGS_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return this.customDescription ?? `Hatch ${this.amount.toLocaleString('en-US')} ${GameConstants.pluralizeString('Egg', this.amount)}.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
