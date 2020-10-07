class ApricornFarming implements Feature {
    name = 'Apricorn';
    saveKey = 'apricorn';

    apricornData: { [type: number]: Apricorn } = {};

    readonly AMOUNT_OF_APRICORNS = 7;
    readonly AMOUNT_OF_PLOTS = 8;

    defaults = {
        apricornList: Array<number>(this.AMOUNT_OF_APRICORNS).fill(0),
        plotList: new Array(this.AMOUNT_OF_PLOTS).fill(null).map(function (value, index) {
            return new ApricornPlot(index === 0, false, ApricornType.None, PlotStage.Seed, 0, 0);
        }),
    };

    apricornList: ArrayOfObservables<number>;
    plotList: ArrayOfObservables<ApricornPlot>;

    constructor() {
        this.apricornList = new ArrayOfObservables(this.defaults.apricornList);
        this.plotList = new ArrayOfObservables(this.defaults.plotList);
    }

    initialize(): void {
        this.apricornData[ApricornType.Black] = new Apricorn(ApricornType.Black, 0, 0, 0);
        this.apricornData[ApricornType.Blue] = new Apricorn(ApricornType.Blue, 0, 0, 0);
        this.apricornData[ApricornType.Green] = new Apricorn(ApricornType.Green, 0, 0, 0);
        this.apricornData[ApricornType.Pink] = new Apricorn(ApricornType.Pink, 0, 0, 0);
        this.apricornData[ApricornType.Red] = new Apricorn(ApricornType.Red, 0, 0, 0);
        this.apricornData[ApricornType.White] = new Apricorn(ApricornType.White, 0, 0, 0);
        this.apricornData[ApricornType.Yellow] = new Apricorn(ApricornType.Yellow, 0, 0, 0);
    }

    getGrowthMultiplier(): number {
        let multiplier = 1;
        
        // TODO: Add multiplying affects
        
        return multiplier;
    }

    update(delta: number): void {
        const timeToReduce = delta * this.getGrowthMultiplier();
        let notify = false;
        this.plotList.forEach(plot => {
            plot.reduceTime(timeToReduce);
            // TODO: Fix notification for all possible messages
            /*
            if (!plot.isEmpty() && plot.timeLeft == 0 && !plot.notified) {
                plot.notified = true;
                notify = true;
            }
            */
        });
        /*
        if (notify) {
            Notifier.notify({ message: 'An Apricorn is ready to harvest!', type: GameConstants.NotificationOption.success, sound: GameConstants.NotificationSound.ready_to_harvest, setting: GameConstants.NotificationSetting.ready_to_harvest });
        }
        */
    }

    unlockPlot(index: number) {
        if (this.canBuyPlot(index)) {
            this.apricornList[index] -= this.calculatePlotPrice(index);
            this.plotList[this.unlockedPlotCount()].isUnlocked = true;
        }
    }

    allPlotsUnlocked() {
        return this.plotList[this.plotList.length - 1].isUnlocked;
    }

    canBuyPlot(index: number) {
        return !this.allPlotsUnlocked() && this.apricornList[index] >= this.calculatePlotPrice(index);
    }

    calculatePlotPrice(index: number): number {
        if (this.allPlotsUnlocked()) {
            return Infinity;
        }
        // TODO: find scaling price
        return index;
    }

    unlockedPlotCount(): number {
        return App.game.apricorn.plotList.filter(plot => plot.isUnlocked).length;
    }

    plant(index: number, apricorn: ApricornType) {
        const plot = this.plotList[index];
        if (!plot.isEmpty() || !plot.isUnlocked || !this.hasApricorn(apricorn)) {
            return;
        }

        this.apricornList[apricorn] -= 1;
        plot.apricorn = apricorn;
        plot.apricornStage = PlotStage.Seed;
        plot.timeLeft = App.game.apricorn.apricornData[apricorn].growTime;
        plot.apricornHarvests = 0;        
    }

    plantAll(apricorn: ApricornType) {
        this.plotList.forEach((plot, index) => {
            this.plant(index, apricorn);
        });
    }

    /**
     * Harvest a plot at the given index
     * @param index The index of the plot to harvest
     */
    harvest(index: number): void {
        const plot = this.plotList[index];
        if (plot.apricorn === ApricornType.None || plot.apricornStage != PlotStage.Berry) {
            return;
        }

        // Saving Apricorn type
        const apricornType = plot.apricorn;
        const amount = plot.harvest();
        GameHelper.incrementObservable(App.game.statistics.totalApricornsHarvested, amount);
        GameHelper.incrementObservable(App.game.statistics.apricornsHarvested[apricornType], amount);
        this.gainApricorn(apricornType, amount);
    }

    /**
     * Try to harvest all plots
     */
    public harvestAll() {
        this.plotList.forEach((plot, index) => {
            this.harvest(index);
        });
    }

    gainRandomApricorn(amount = 1, disableNotification = false) {
        const apricorn = GameHelper.getIndexFromDistribution(GameConstants.ApricornDistribution);
        if (!disableNotification) {
            Notifier.notify({ message: `You got a ${ApricornType[apricorn]} Apricorn!`, type: GameConstants.NotificationOption.success, setting: GameConstants.NotificationSetting.route_item_found });
        }
        this.gainApricorn(apricorn, amount);
    }

    gainApricorn(apricorn: ApricornType, amount = 1) {
        this.apricornList[apricorn] += Math.floor(amount);
    }

    hasApricorn(apricorn: ApricornType) {
        return this.apricornList[apricorn] > 0;
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Apricorn_box);
    }

    toJSON(): Record<string, any> {
        return {
            apricornList: this.apricornList.map(x => x),
            plotList: this.plotList.map(plot => plot.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const savedApricorns = json['apricornList'];
        if (savedApricorns == null) {
            this.apricornList = new ArrayOfObservables(this.defaults.apricornList);
        } else {
            (savedApricorns as number[]).forEach((value: number, index: number) => {
                this.apricornList[index] = value;
            });
        }

        const savedPlots = json['plotList'];
        if (savedPlots == null) {
            this.plotList = new ArrayOfObservables(this.defaults.plotList);
        } else {
            (savedPlots as Record<string, any>[]).forEach((value: Record<string, any>, index: number) => {
                const plot: ApricornPlot = new ApricornPlot(false, false, ApricornType.None, PlotStage.Seed, 0, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }
    }
}
