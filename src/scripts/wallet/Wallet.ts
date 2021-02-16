/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Wallet implements Feature {
    name = 'Wallet';
    saveKey = 'wallet';
    currencies: Array<KnockoutObservable<number>>;

    defaults = {
        currencies: new Array(GameHelper.enumLength(GameConstants.Currency)).fill(0),
    };

    constructor(private multiplier: Multiplier) {
        this.currencies = this.defaults.currencies.map((v) => ko.observable(v));
    }

    public gainMoney(base: number, origin?: string): number {
        const bonus = this.multiplier.getBonus('money', true);
        const money = Math.floor(base * bonus);

        GameHelper.incrementObservable(App.game.statistics.totalMoney, money);

        this.addAmount(new Amount(money, Currency.money));
        return money;
    }

    public gainDungeonTokens(base: number, origin?: string) {
        const bonus = this.multiplier.getBonus('dungeonToken', true);
        const tokens = Math.floor(base * bonus);

        GameHelper.incrementObservable(App.game.statistics.totalDungeonTokens, tokens);

        this.addAmount(new Amount(tokens, Currency.dungeonToken));
    }

    public gainQuestPoints(base: number, origin?: string) {
        let points = base;

        points = Math.floor(points);

        GameHelper.incrementObservable(App.game.statistics.totalQuestPoints, points);

        this.addAmount(new Amount(points, Currency.questPoint));
    }

    public gainDiamonds(base: number, origin?: string) {
        let diamonds = base;

        diamonds = Math.floor(diamonds);

        GameHelper.incrementObservable(App.game.statistics.totalDiamonds, diamonds);

        this.addAmount(new Amount(diamonds, Currency.diamond));
    }

    public gainFarmPoints(base: number, origin?: string) {
        let points = base;

        points = Math.floor(points);

        GameHelper.incrementObservable(App.game.statistics.totalFarmPoints, points);

        this.addAmount(new Amount(points, Currency.farmPoint));
    }

    public gainBattlePoints(base: number) {
        let bPoints = base;

        bPoints = Math.floor(bPoints);

        GameHelper.incrementObservable(App.game.statistics.totalBattlePoints, bPoints);

        this.addAmount(new Amount(bPoints, Currency.battlePoint));
    }

    public addAmount(amount: Amount) {
        if (isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not add amount:', amount);
            amount.amount = 1;
        }

        GameHelper.incrementObservable(this.currencies[amount.currency], amount.amount);

        switch (amount.currency) {
            case GameConstants.Currency.money:
                GameController.animateCurrency(amount.amount, 'playerMoney');
                break;
            case GameConstants.Currency.dungeonToken:
                GameController.animateCurrency(amount.amount, 'playerMoneyDungeon');
                break;
            case GameConstants.Currency.questPoint:
                GameController.animateCurrency(amount.amount, 'playerMoneyQuest');
                break;
        }
    }

    public hasAmount(amount: Amount) {
        return this.currencies[amount.currency]() >= amount.amount;
    }

    public loseAmount(amount: Amount) {
        if (isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not remove amount:', amount);
            amount.amount = 1;
        }

        GameHelper.incrementObservable(this.currencies[amount.currency], -amount.amount);
    }


    initialize(): void {
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.currencies = this.defaults.currencies.map((v) => ko.observable(v));
        if (json['currencies'] !== null) {
            const currenciesJson = json.currencies;
            currenciesJson.forEach((value, index) => {
                this.currencies[index](value || 0);
            });
        }
    }

    toJSON(): Record<string, any> {
        return {
            currencies: this.currencies.map(ko.unwrap),
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
