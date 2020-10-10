class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    berryData: Berry[] = [];

    readonly AMOUNT_OF_PLOTS = 25;

    defaults = {
        berryList: Array<number>(GameConstants.AMOUNT_OF_BERRY_TYPES).fill(0),
        unlockedBerries: Array<boolean>(GameConstants.AMOUNT_OF_BERRY_TYPES).fill(false),
        plotList: new Array(this.AMOUNT_OF_PLOTS).fill(null).map(function (value, index) {
            return new Plot(index === 0, BerryType.None, 0);
        }),
    };

    berryList: ArrayOfObservables<number>;
    unlockedBerries: ArrayOfObservables<boolean>;
    plotList: ArrayOfObservables<Plot>;

    constructor() {
        this.berryList = new ArrayOfObservables(this.defaults.berryList);
        this.unlockedBerries = new ArrayOfObservables(this.defaults.unlockedBerries);
        this.plotList = new ArrayOfObservables(this.defaults.plotList);
    }

    initialize(): void {
        // First Generation
        this.berryData[BerryType.Cheri]     = new Berry(BerryType.Cheri,    [2,4,6,8,16], 1, .5, 6);
        this.berryData[BerryType.Chesto]    = new Berry(BerryType.Chesto,   [5,15,25,40,120], 1, .4, 8);
        this.berryData[BerryType.Pecha]     = new Berry(BerryType.Pecha,    [10,35,50,60,140], 2, .3, 10);
        this.berryData[BerryType.Rawst]     = new Berry(BerryType.Rawst,    [15,30,45,60,180], 1, .5, 14);
        this.berryData[BerryType.Aspear]    = new Berry(BerryType.Aspear,   [10,40,50,110,210], 1, .2, 18);
        this.berryData[BerryType.Leppa]     = new Berry(BerryType.Leppa,    [100,120,140,240,480], 3, .2, 30);
        this.berryData[BerryType.Oran]      = new Berry(BerryType.Oran,     [120,180,240,300,520], 5, .1, 35);
        this.berryData[BerryType.Sitrus]    = new Berry(BerryType.Sitrus,   [150,300,450,600,900], 5, .1, 60);
        
        // Second Generation
        this.berryData[BerryType.Persim]    = new Berry(BerryType.Persim,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Razz]      = new Berry(BerryType.Razz,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Bluk]      = new Berry(BerryType.Bluk,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Nanab]     = new Berry(BerryType.Nanab,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Wepear]    = new Berry(BerryType.Wepear,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Pinap]     = new Berry(BerryType.Pinap,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        
        this.berryData[BerryType.Figy]      = new Berry(BerryType.Figy,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Wiki]      = new Berry(BerryType.Wiki,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Mago]      = new Berry(BerryType.Mago,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Aquav]     = new Berry(BerryType.Aquav,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Iapapa]    = new Berry(BerryType.Iapapa,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        
        this.berryData[BerryType.Lum]       = new Berry(BerryType.Lum,      [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        
        // Third Generation
        this.berryData[BerryType.Pomeg]     = new Berry(BerryType.Pomeg,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Kelpsy]    = new Berry(BerryType.Kelpsy,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Qualot]    = new Berry(BerryType.Qualot,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Hondew]    = new Berry(BerryType.Hondew,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Grepa]     = new Berry(BerryType.Grepa,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Tamato]    = new Berry(BerryType.Tamato,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        
        // Fourth Generation
        this.berryData[BerryType.Cornn]     = new Berry(BerryType.Cornn,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Magost]    = new Berry(BerryType.Magost,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Rabuta]    = new Berry(BerryType.Rabuta,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Nomel]     = new Berry(BerryType.Nomel,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Spelon]    = new Berry(BerryType.Spelon,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Pamtre]    = new Berry(BerryType.Pamtre,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Watmel]    = new Berry(BerryType.Watmel,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Durin]     = new Berry(BerryType.Durin,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Belue]     = new Berry(BerryType.Belue,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        
        // Type Generation
        this.berryData[BerryType.Occa]      = new Berry(BerryType.Occa,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Passho]    = new Berry(BerryType.Passho,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Wacan]     = new Berry(BerryType.Wacan,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Rindo]     = new Berry(BerryType.Rindo,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Yache]     = new Berry(BerryType.Yache,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Chople]    = new Berry(BerryType.Chople,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Kebia]     = new Berry(BerryType.Kebia,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Shuca]     = new Berry(BerryType.Shuca,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Coba]      = new Berry(BerryType.Coba,     [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Payapa]    = new Berry(BerryType.Payapa,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Tanga]     = new Berry(BerryType.Tanga,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Charti]    = new Berry(BerryType.Charti,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Kasib]     = new Berry(BerryType.Kasib,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Haban]     = new Berry(BerryType.Haban,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Colbur]    = new Berry(BerryType.Colbur,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Babiri]    = new Berry(BerryType.Babiri,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Chilan]    = new Berry(BerryType.Chilan,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Roseli]    = new Berry(BerryType.Roseli,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties

        // Fifth Generation
        this.berryData[BerryType.Liechi]    = new Berry(BerryType.Liechi,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Ganlon]    = new Berry(BerryType.Ganlon,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Salac]     = new Berry(BerryType.Salac,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Petaya]    = new Berry(BerryType.Petaya,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Apicot]    = new Berry(BerryType.Apicot,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Lansat]    = new Berry(BerryType.Lansat,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Starf]     = new Berry(BerryType.Starf,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Micle]     = new Berry(BerryType.Micle,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Custap]    = new Berry(BerryType.Custap,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        
        this.berryData[BerryType.Jaboca]    = new Berry(BerryType.Jaboca,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Rowap]     = new Berry(BerryType.Rowap,    [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Kee]       = new Berry(BerryType.Kee,      [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
        this.berryData[BerryType.Maranga]   = new Berry(BerryType.Maranga,  [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
    
        this.berryData[BerryType.Enigma]    = new Berry(BerryType.Enigma,   [5,10,15,20,40], 1, .1, 60); // TODO: Set properties
    
        FarmController.resetPages();
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
        let index = this.unlockBerryIndex();
        if (this.canBuyPlot()) {
            this.berryList[index] -= this.calculatePlotPrice();
            this.plotList[index+1].isUnlocked = true;
        }
    }

    allPlotsUnlocked() {
        return this.plotList[this.plotList.length - 1].isUnlocked;
    }

    canBuyPlot() {
        return !this.allPlotsUnlocked() && App.game.farming.berryList[this.unlockBerryIndex()] > this.calculatePlotPrice();
    }

    calculatePlotPrice(): number {
        if (this.allPlotsUnlocked()) {
            return Infinity;
        }
        
        // TODO: Rebalance cost based on berry growth rate
        return 10 * Math.floor(Math.pow(this.unlockedPlotCount(), 2));
    }

    unlockedPlotCount() {
        return App.game.farming.plotList.filter(plot => plot.isUnlocked).length;
    }

    unlockBerryIndex() {
        return this.unlockedPlotCount() - 1;
    }

    highestUnlockedBerry(): number {
        for (let i = GameConstants.AMOUNT_OF_BERRY_TYPES - 1;i >= 0;i--) {
            if (this.unlockedBerries[i]) {
                return i;
            }
        }
        return 0;
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

        if (!this.unlockedBerries[berry]) {
            // TODO: NOTIFY PLAYER?
            this.unlockedBerries[berry] = true;
            FarmController.resetPages();
        }
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
            unlockedBerries: this.unlockedBerries.map(x => x),
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

        const savedUnlockedBerries = json['unlockedBerries'];
        if (this.unlockedBerries == null) {
            this.unlockedBerries = new ArrayOfObservables(this.defaults.unlockedBerries);
        } else {
            (savedUnlockedBerries as boolean[]).forEach((value: boolean, index: number) => {
                this.unlockedBerries[index] = value;
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
