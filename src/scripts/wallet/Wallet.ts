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

    public gainMoney(base: number): Amount {
        return this.addAmount(new Amount(base, Currency.money));
    }

    public gainDungeonTokens(base: number): Amount {
        return this.addAmount(new Amount(base, Currency.dungeonToken));
    }

    public gainQuestPoints(base: number): Amount {
        return this.addAmount(new Amount(base, Currency.questPoint));
    }

    public gainDiamonds(base: number): Amount {
        return this.addAmount(new Amount(base, Currency.diamond));
    }

    public gainFarmPoints(base: number): Amount {
        return this.addAmount(new Amount(base, Currency.farmPoint));
    }

    public gainBattlePoints(base: number): Amount {
        return this.addAmount(new Amount(base, Currency.battlePoint));
    }

    public calcBonus(amount: Amount) {
        switch (amount.currency) {
            case GameConstants.Currency.money:
                return this.multiplier.getBonus('money', true);
            case GameConstants.Currency.dungeonToken:
                return this.multiplier.getBonus('dungeonToken', true);
            case GameConstants.Currency.questPoint:
            case GameConstants.Currency.diamond:
            case GameConstants.Currency.farmPoint:
            case GameConstants.Currency.battlePoint:
            default:
                return 1;
        }
    }

    public addAmount(amount: Amount) {
        if (isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not add amount:', amount);
            amount.amount = 1;
        }

        // Calculate the bonuses
        amount.amount = Math.floor(amount.amount * this.calcBonus(amount));

        GameHelper.incrementObservable(this.currencies[amount.currency], amount.amount);
        GameController.animateCurrency(amount);

        switch (amount.currency) {
            case GameConstants.Currency.money:
                GameHelper.incrementObservable(App.game.statistics.totalMoney, amount.amount);
                break;
            case GameConstants.Currency.dungeonToken:
                GameHelper.incrementObservable(App.game.statistics.totalDungeonTokens, amount.amount);
                break;
            case GameConstants.Currency.questPoint:
                GameHelper.incrementObservable(App.game.statistics.totalQuestPoints, amount.amount);
                break;
            case GameConstants.Currency.diamond:
                GameHelper.incrementObservable(App.game.statistics.totalDiamonds, amount.amount);
                break;
            case GameConstants.Currency.farmPoint:
                GameHelper.incrementObservable(App.game.statistics.totalFarmPoints, amount.amount);
                break;
            case GameConstants.Currency.battlePoint:
                GameHelper.incrementObservable(App.game.statistics.totalBattlePoints, amount.amount);
                break;
        }

        return amount;
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
