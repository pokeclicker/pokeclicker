class Wallet implements Feature {
    name = 'Wallet';
    saveKey = 'wallet';
    currencies: ArrayOfObservables<number>;

    defaults = {
        currencies: [0, 0, 0, 0, 0],
    };

    constructor() {
        this.currencies = new ArrayOfObservables(this.defaults.currencies);
    }

    public gainMoney(base: number, origin?: string): number {
        App.game.oakItems.use(OakItems.OakItem.Amulet_Coin);

        let money = base;
        money *= App.game.oakItems.calculateBonus(OakItems.OakItem.Amulet_Coin);
        money *= AchievementHandler.getMoneyMultiplier();
        money *= EffectEngineRunner.getMoneyMultiplier();

        money = Math.floor(money);

        GameHelper.incrementObservable(App.game.statistics.totalMoney, money);
        GameController.animateCurrency(money, 'playerMoney');

        this.addAmount(new Amount(money, Currency.money));
        return money;
    }

    public gainDungeonTokens(base: number, origin?: string) {
        let tokens = base;
        tokens *= EffectEngineRunner.getDungeonTokenMultiplier();

        tokens = Math.floor(tokens);

        GameHelper.incrementObservable(App.game.statistics.totalDungeonTokens, tokens);
        GameController.animateCurrency(tokens, 'playerMoneyDungeon');

        this.addAmount(new Amount(tokens, Currency.dungeonToken));
    }

    public gainQuestPoints(base: number, origin?: string) {
        let points = base;

        points = Math.floor(points);

        GameHelper.incrementObservable(App.game.statistics.totalQuestPoints, points);
        GameController.animateCurrency(points, 'playerMoneyQuest');

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

    private addAmount(amount: Amount) {
        if (isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not add amount:', amount);
            amount.amount = 1;
        }

        this.currencies[amount.currency] += amount.amount;
    }

    public hasAmount(amount: Amount) {
        return this.currencies[amount.currency] >= amount.amount;
    }

    public loseAmount(amount: Amount) {
        if (isNaN(amount.amount) || amount.amount <= 0) {
            console.trace('Could not remove amount:', amount);
            amount.amount = 1;
        }

        this.currencies[amount.currency] -= amount.amount;
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

        if (json['currencies'] == null) {
            this.currencies = new ArrayOfObservables(this.defaults.currencies);
        } else {
            const currenciesJson = json['currencies'];
            this.currencies = new ArrayOfObservables([
                currenciesJson[GameConstants.Currency.money],
                currenciesJson[GameConstants.Currency.questPoint],
                currenciesJson[GameConstants.Currency.dungeonToken],
                currenciesJson[GameConstants.Currency.diamond],
                currenciesJson[GameConstants.Currency.farmPoint],
            ]);
        }
    }

    toJSON(): Record<string, any> {
        return {
            'currencies': [
                this.currencies[GameConstants.Currency.money],
                this.currencies[GameConstants.Currency.questPoint],
                this.currencies[GameConstants.Currency.dungeonToken],
                this.currencies[GameConstants.Currency.diamond],
                this.currencies[GameConstants.Currency.farmPoint],
            ],
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
