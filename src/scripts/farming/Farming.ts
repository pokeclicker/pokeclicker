class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: { [type: number]: Berry } = {};

    // TODO: Change this to fit all berry types
    readonly AMOUNT_OF_BERRIES = 8;
    readonly AMOUNT_OF_PLOTS = 25;

    defaults = {
        berryList: Array<number>(this.AMOUNT_OF_BERRIES).fill(0),
        plotList: new Array(this.AMOUNT_OF_PLOTS).fill(null).map(function (value, index) {
            return new Plot(index === 0, BerryType.None, 0);
        }),
    };

    berryList: ArrayOfObservables<number>;
    plotList: ArrayOfObservables<Plot>;

    constructor() {
        this.berryList = new ArrayOfObservables(this.defaults.berryList);
        this.plotList = new ArrayOfObservables(this.defaults.plotList);
    }

    initialize(): void {
        this.berryData[BerryType.Cheri]     = new Berry(BerryType.Cheri,    [2,4,6,8,16], 1, .5, 6);
        this.berryData[BerryType.Chesto]    = new Berry(BerryType.Chesto,   [5,15,25,40,120], 1, .4, 8);
        this.berryData[BerryType.Pecha]     = new Berry(BerryType.Pecha,    [10,35,50,60,140], 2, .3, 10);
        this.berryData[BerryType.Rawst]     = new Berry(BerryType.Rawst,    [15,30,45,60,180], 1, .5, 14);
        this.berryData[BerryType.Aspear]    = new Berry(BerryType.Aspear,   [10,40,50,110,210], 1, .2, 18);
        this.berryData[BerryType.Leppa]     = new Berry(BerryType.Leppa,    [100,120,140,240,480], 3, .2, 30);
        this.berryData[BerryType.Oran]      = new Berry(BerryType.Oran,     [120,180,240,300,520], 5, .1, 35);
        this.berryData[BerryType.Sitrus]    = new Berry(BerryType.Sitrus,   [150,300,450,600,900], 5, .1, 60);
    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        multiplier *= App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck);
        return multiplier;
    }

    update(delta: number): void {
        const timeToReduce = delta * this.getGrowthMultiplier();

        let notifications = [];

        this.plotList.forEach(plot => {
            plot.update(timeToReduce);
            if (plot.notifications) {
                notifications = [...notifications, ...plot.notifications];
                plot.notifications = [];
            }
        });

        if (notifications.length) {
            for (let i = 0;i < notifications.length;i++) {
                this.handleNotification(notifications[i]);
            }
        }
    }

    // TODO: Change details of notifier for different notifications
    handleNotification(type: FarmNotificationType): void {
        switch(type) {
            case FarmNotificationType.Ripe:
                Notifier.notify({
                    message: 'A berry is ready to harvest!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Withered:
                Notifier.notify({
                    message: 'A berry plant has withered!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Mutated:
                Notifier.notify({
                    message: 'A berry plant has mutated!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Replanted:
                Notifier.notify({
                    message: 'A berry has been replanted!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
            case FarmNotificationType.Dropped:
                Notifier.notify({
                    message: 'A berry has been dropped!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.ready_to_harvest,
                    setting: NotificationConstants.NotificationSetting.ready_to_harvest,
                });
                break;
        }
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
        plot.age = 0;
        plot.notifications = [];
    }

    plantAll(berry: BerryType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, berry);
        });
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number): void {
        const plot = this.plotList[index];
        if (plot.berry === BerryType.None || plot.stage() != PlotStage.Berry) {
            return;
        }

        App.game.wallet.gainFarmPoints(this.berryData[plot.berry].farmValue);
        
        let amount = plot.harvest();

        GameHelper.incrementObservable(App.game.statistics.totalBerriesHarvested, amount);
        GameHelper.incrementObservable(App.game.statistics.berriesHarvested[plot.berry], amount);
        this.gainBerry(plot.berry, amount);

        App.game.oakItems.use(OakItems.OakItem.Sprayduck);

        plot.die(true);
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index);
        });
    }

    /**
     * Gives the player a random berry from the first 8 types
     * @param amount Amount of berries to give. Defaults to 1.
     * @param disableNotification Set to true to not notify the player. Defaults to false.
     */
    gainRandomBerry(amount = 1, disableNotification = false) {
        const berry = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        if (!disableNotification) {
            Notifier.notify({
                message: `You got a ${BerryType[berry]} berry!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.route_item_found,
            });
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
                const plot: Plot = new Plot(false, BerryType.None, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }
    }
}
