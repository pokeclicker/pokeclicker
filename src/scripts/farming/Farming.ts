class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: { [type: number]: Berry } = {};

    readonly AMOUNT_OF_BERRIES = 8;
    readonly AMOUNT_OF_PLOTS = 25;

    defaults = {
        berryList: Array<number>(this.AMOUNT_OF_BERRIES).fill(0),
        plotList: new Array(this.AMOUNT_OF_PLOTS).fill(null).map(function (value, index) {
            return new Plot(index === 0, false, BerryType.None, 0);
        }),
    };

    berryList: ArrayOfObservables<number>;
    plotList: ArrayOfObservables<Plot>;

    constructor() {
        this.berryList = new ArrayOfObservables(this.defaults.berryList);
        this.plotList = new ArrayOfObservables(this.defaults.plotList);
    }

    initialize(): void {
        this.berryData[BerryType.Cheri] = new Berry(BerryType.Cheri, 30, 100, 6);
        this.berryData[BerryType.Chesto] = new Berry(BerryType.Chesto, 45, 150, 8);
        this.berryData[BerryType.Pecha] = new Berry(BerryType.Pecha, 60, 180, 10);
        this.berryData[BerryType.Rawst] = new Berry(BerryType.Rawst, 90, 240, 14);
        this.berryData[BerryType.Aspear] = new Berry(BerryType.Aspear, 120, 290, 18);
        this.berryData[BerryType.Leppa] = new Berry(BerryType.Leppa, 240, 460, 30);
        this.berryData[BerryType.Oran] = new Berry(BerryType.Oran, 300, 530, 35);
        this.berryData[BerryType.Sitrus] = new Berry(BerryType.Sitrus, 600, 1000, 60);
    }

    update(delta: number): void {
        const timeToReduce = delta * App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck);
        this.plotList.forEach(plot => {
            plot.reduceTime(timeToReduce);
        });
    }

    unlockPlot() {
        if (this.canBuyPlot()) {
            App.game.wallet.loseAmount(this.calculatePlotPrice());
            this.plotList[this.unlockedPlotCount()].isUnlocked = true;
        }
    }

    allPlotsUnlocked() {
        return this.plotList[this.plotList.length - 1].isUnlocked;
    }

    canBuyPlot() {
        return !this.allPlotsUnlocked() && App.game.wallet.hasAmount(this.calculatePlotPrice());
    }

    calculatePlotPrice(): Amount {
        if (this.allPlotsUnlocked()) {
            return new Amount(Infinity, GameConstants.Currency.farmPoint);
        }
        const plotCount = this.unlockedPlotCount();
        return new Amount(10 * Math.floor(Math.pow(plotCount, 2)), GameConstants.Currency.farmPoint);
    }

    unlockedPlotCount() {
        return App.game.farming.plotList.filter(plot => plot.isUnlocked).length;
    }

    plant(index: number, berry: BerryType) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasBerry(berry)) {
            return;
        }

        this.berryList[berry] -= 1;
        plot.berry = berry;
        plot.timeLeft = this.berryData[berry].harvestTime;
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry);
        });
    }

    /**
     * Harvest a plot at the given index, returns the amount of money gained from the harvest.
     * @param index The index of the plot to harvest
     * @param suppressNotification Suppress the notification of the amount of money gained
     */
    harvest(index: number, suppressNotification = false): number {
        const plot = this.plotList[index];
        if (plot.berry === BerryType.None || plot.timeLeft > 0) {
            return 0;
        }

        App.game.wallet.gainFarmPoints(this.berryData[plot.berry].farmValue);
        const money = App.game.wallet.gainMoney(this.berryData[plot.berry].moneyValue);
        const amount = GameConstants.randomIntBetween(2, 3);
        GameHelper.incrementObservable(App.game.statistics.totalBerriesHarvested, amount);
        GameHelper.incrementObservable(App.game.statistics.berriesHarvested[plot.berry], amount);
        this.gainBerry(plot.berry, amount);

        if (!suppressNotification) {
            Notifier.notify({ message: `You earned ${money} money from the harvest!`, type: GameConstants.NotificationOption.success });
        }

        plot.berry = BerryType.None;
        App.game.oakItems.use(OakItems.OakItem.Sprayduck);
        return money;
    }

    /**
     * Try to harvest all plots, suppresses the individual notifications
     */
    public harvestAll() {
        let total = 0;
        this.plotList.forEach((plot, index) => {
            total += this.harvest(index, true);
        });

        if (total > 0) {
            Notifier.notify({ message: `You earned ${total} money from the harvest!`, type: GameConstants.NotificationOption.success });
        }
    }

    gainRandomBerry(amount = 1, disableNotification = false) {
        const berry = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        if (!disableNotification) {
            Notifier.notify({ message: `You got a ${BerryType[berry]} berry!`, type: GameConstants.NotificationOption.success, setting: GameConstants.NotificationSetting.route_item_found });
        }
        this.gainBerry(berry, amount);
    }

    gainBerry(berry: BerryType, amount = 1) {
        this.berryList[berry] += Math.floor(amount);
    }

    hasBerry(berry: BerryType) {
        return this.berryList[berry] > 0;
    }

    canAccess(): boolean {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Wailmer_pail);
    }

    toJSON(): Record<string, any> {
        return {
            berryList: this.berryList.map(x => x),
            plotList: this.plotList.map(plot => plot.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedBerries = json['berryList'];
        if (savedBerries == null) {
            this.berryList = new ArrayOfObservables(this.defaults.berryList);
        } else {
            (savedBerries as number[]).forEach((value: number, index: number) => {
                this.berryList[index] = value;
            });
        }

        const savedPlots = json['plotList'];
        if (savedPlots == null) {
            this.plotList = new ArrayOfObservables(this.defaults.plotList);
        } else {
            (savedPlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const plot: Plot = new Plot(false, false, BerryType.None, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }
    }
}
