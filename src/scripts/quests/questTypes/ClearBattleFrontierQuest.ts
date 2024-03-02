/// <reference path="../Quest.ts" />

class ClearBattleFrontierQuest extends Quest implements QuestInterface {

    constructor(amount: number, reward: number) {
        super(amount, reward);
        this.focus = App.game.statistics.battleFrontierTotalStagesCompleted;
    }

    public static canComplete() {
        return App.game.statistics.battleFrontierTotalStagesCompleted() > 1;
    }

    public static generateData(): any[] {
        const amount = SeededRand.float(150) + 50;
        const reward = this.calcReward(amount) / amount;
        return [amount, reward];
    }

    private static calcReward(amount: number): number {
        const reward = Math.ceil(amount * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * 8);
        return super.randomizeReward(reward);
    }

    get description(): string {
        const suffix = this.amount > 1 ? 's' : '';
        return `Clear ${this.tieredAmount().toLocaleString('en-US')} Stages in the Battle Frontier.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        return json;
    }
}
