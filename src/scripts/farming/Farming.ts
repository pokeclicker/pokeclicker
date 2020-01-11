class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    readonly AMOUNT_OF_BERRIES = 8;
    readonly AMOUNT_OF_PLOTS = 25;

    defaults = {
        berryList: Array<number>(this.AMOUNT_OF_BERRIES).fill(0),
        plotList: Array<Plot>(this.AMOUNT_OF_PLOTS).fill(
            new Plot(true, false, BerryType.None, 0),
            0, 1
        ).fill(
            new Plot(false, false, BerryType.None, 0)
            , 1, this.AMOUNT_OF_PLOTS),
    };

    berryList: ArrayOfObservables<number>;
    plotList: ArrayOfObservables<Plot>;


    constructor() {
        this.berryList = new ArrayOfObservables(this.defaults.berryList);
        this.plotList = new ArrayOfObservables(this.defaults.plotList);

    }

    canAccess(): boolean {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Wailmer_pail);
    }

    fromJSON(json: object): void {
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
            (savedPlots as object[]).forEach((value: object, index: number) => {
                const plot: Plot = new Plot(false, false, BerryType.None, 0);
                plot.fromJSON(value);
                this.plotList[index] = plot;
            });
        }


    }

    initialize(): void {
    }

    toJSON(): object {
        return {
            berryList: this.berryList.map(x => x),
            plotList: this.plotList.map(plot => plot.toJSON()),
        };
    }

    update(delta: number): void {
        const timeToReduce = App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck);
        this.plotList.forEach(plot => {
            plot.reduceTime(timeToReduce);
        });
    }

}
