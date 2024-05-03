/// <reference path="../../declarations/enums/MulchType.d.ts"/>

class FarmController {

    public static navigateIndex: KnockoutObservable<number> = ko.observable(0);
    public static berryListFiltered: KnockoutObservableArray<BerryType> = ko.observableArray([]);
    public static numberOfTabs: KnockoutComputed<number>;
    public static farmingModalTabSelected: KnockoutObservable<string> = ko.observable('berryFarmView');

    public static berryListEnd: KnockoutComputed<number>;

    public static selectedBerry: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public static selectedMulch: KnockoutObservable<MulchType> = ko.observable(MulchType.Boost_Mulch);
    public static selectedFarmTool: KnockoutObservable<FarmingTool> = ko.observable(FarmingTool.Berry);
    public static selectedFarmModuleTool: KnockoutObservable<FarmingTool> = ko.observable(FarmingTool.Berry);

    public static berryListVisible: KnockoutObservable<boolean> = ko.observable(true);

    public static multipliers = ['×1', '×10', '×100', '×1000', 'All'];
    public static multIndex: KnockoutObservable<number> = ko.observable(0);

    static readonly BERRIES_PER_PAGE = 8;

    public static initialize() {
        this.berryListFiltered(Array.from(Array(GameHelper.enumLength(BerryType) - 1).keys()));

        this.numberOfTabs = ko.pureComputed(() => {
            return Math.floor(App.game.farming.highestUnlockedBerry() / this.BERRIES_PER_PAGE);
        });

        this.berryListEnd = ko.pureComputed(() => {
            const highestMutation = App.game.farming.mutations.slice().sort((a, b) => b.mutatedBerry - a.mutatedBerry).find(mut => mut._hintSeen() && !App.game.farming.unlockedBerries[mut.mutatedBerry]());
            const highestMutationHint = highestMutation?.mutatedBerry ?? 0;
            return Math.max(App.game.farming.highestUnlockedBerry(), highestMutationHint);
        });

        this.navigateIndex(0);
    }

    public static openFarmModal() {
        if (App.game.farming.canAccess()) {
            $('#farmModal').modal('show');
        } else {
            Notifier.notify({
                message: `You need the ${GameConstants.humanifyString(KeyItemType[KeyItemType.Wailmer_pail])} to access this location.\n<i>Clear Route 13 or 15 first.</i>`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static getImage(index: number) {
        const plot: Plot = App.game.farming.plotList[index];
        if (plot.berry === BerryType.None) {
            return '';
        }
        if (plot.stage() === PlotStage.Seed) {
            return 'assets/images/farm/AllTreeSeed.png';
        } else if (plot.stage() === PlotStage.Sprout) {
            return 'assets/images/farm/AllTreeSprout.png';
        }
        return `assets/images/farm/${BerryType[plot.berry]}Tree${PlotStage[plot.stage()]}.png`;
    }

    public static calculateCssClassFromTool(plot: Plot, tool: FarmingTool) {
        switch (tool) {
            case FarmingTool.Lock:
                return 'PlotSafeLockSelected';
            case FarmingTool.Mulch:
                return 'MulchSelected';
            case FarmingTool.Shovel:
                return 'ShovelSelected';
            case FarmingTool.MulchShovel:
                return 'MulchShovelSelected';
            case FarmingTool.Berry:
            default:
                return plot.wanderer ? 'WandererHandling' : 'BerrySelected';
        }
    }

    public static calculateCssClass(plot: Plot) {
        return this.calculateCssClassFromTool(plot, this.selectedFarmTool());
    }

    public static calcMulchClass(plot: Plot) {
        if (plot.mulch === MulchType.None) {
            return '';
        }
        return MulchType[plot.mulch];
    }

    public static plotClick(index: number, event: MouseEvent) {
        const plot: Plot = App.game.farming.plotList[index];

        // If shift key held, lock/unlock plot
        if (event.shiftKey) {
            this.shiftTogglePlotSafeLock(plot, index);
        } else {
            this.handleClickActions(this.selectedFarmTool(), plot, index);
        }
    }

    public static plotClickMini(index: number, event: MouseEvent) {
        const plot: Plot = App.game.farming.plotList[index];

        // Unlocking Plot (we don't want to do this in the farm module)
        if (!plot.isUnlocked) {
            return;
        }

        // If shift key held, lock/unlock plot
        if (event.shiftKey) {
            this.shiftTogglePlotSafeLock(plot, index);
        } else {
            this.handleClickActions(this.selectedFarmModuleTool(), plot, index);
        }
    }

    private static shiftTogglePlotSafeLock(plot: Plot, index: number) {
        if (!plot.isUnlocked) {
            return;
        }

        App.game.farming.togglePlotSafeLock(index);
    }

    public static toggleAllPlotLocks() {
        App.game.farming.plotList.forEach((plot, index) => {
            if (plot.isUnlocked) {
                App.game.farming.togglePlotSafeLock(index);
            }
        });
    }

    public static toggleAllPlotLocksTo(lock: boolean) {
        App.game.farming.plotList.forEach((plot, index) => {
            if (plot.isUnlocked && ((lock && !plot.isSafeLocked) || (!lock && plot.isSafeLocked))) {
                App.game.farming.togglePlotSafeLock(index);
            }
        });
    }

    private static handleClickActions(tool: FarmingTool, plot: Plot, index: number) {
        // Unlocking Plot
        if (!plot.isUnlocked) {
            return App.game.farming.unlockPlot(index);
        }
        // Check which tool we have selected
        switch (tool) {
            case FarmingTool.Berry:
                if (plot.wanderer) {
                    App.game.farming.handleWanderer(plot);
                } else if (plot.isEmpty()) {
                    App.game.farming.plant(index, this.selectedBerry());
                } else {
                    App.game.farming.harvest(index);
                }
                break;
            case FarmingTool.Mulch:
                App.game.farming.addMulch(index, this.selectedMulch(), this.getAmount());
                break;
            case FarmingTool.Shovel:
                App.game.farming.shovel(index);
                break;
            case FarmingTool.MulchShovel:
                App.game.farming.shovelMulch(index);
                break;
            case FarmingTool.Lock:
                App.game.farming.togglePlotSafeLock(index);
                break;
        }
    }

    public static calculateCssClassMini(plot: Plot) {
        return this.calculateCssClassFromTool(plot, this.selectedFarmModuleTool());
    }

    public static mulchAll() {
        if (!Settings.getSetting('confirmBeformeMulchingAllPlots').observableValue()) {
            return App.game.farming.mulchAll(FarmController.selectedMulch(), this.getAmount());
        }

        Notifier.confirm({
            title: 'Mulch All',
            message: `Are you sure you want to use ${this.getAmount()} ${MulchType[FarmController.selectedMulch()].replace('_', ' ')} on all plots?`,
            type: NotificationConstants.NotificationOption.info,
            confirm: 'Mulch',
        }).then(confirmed => {
            if (confirmed) {
                App.game.farming.mulchAll(FarmController.selectedMulch(), this.getAmount());
            }
        });
    }

    public static navigateRight() {
        if (FarmController.navigateIndex() < FarmController.numberOfTabs()) {
            FarmController.navigateIndex(FarmController.navigateIndex() + 1);
            this.selectedBerry(this.getUnlockedBerryListWithIndex()[0]);
        }
    }

    public static navigateLeft() {
        if (FarmController.navigateIndex() > 0) {
            FarmController.navigateIndex(FarmController.navigateIndex() - 1);
            this.selectedBerry(this.getUnlockedBerryListWithIndex()[0]);
        }
    }

    public static getUnlockedBerryListWithIndex() {
        return this.getUnlockedBerryList().slice(this.navigateIndex() * this.BERRIES_PER_PAGE, (this.navigateIndex() * this.BERRIES_PER_PAGE) + this.BERRIES_PER_PAGE);
    }

    public static getUnlockedBerryList() {
        return this.berryListFiltered().filter((berry) => berry <= this.berryListEnd());
    }

    private static getAmount() {
        return Number(this.multipliers[this.multIndex()].replace(/\D/g, '')) || Infinity;
    }

    public static incrementMultiplier() {
        this.multIndex((this.multIndex() + 1) % this.multipliers.length);
    }

    public static decrementMultiplier() {
        this.multIndex((this.multIndex() + this.multipliers.length - 1) % this.multipliers.length);
    }

    public static getBackgroundColor(index: number) {
        if (App.game.farming.unlockedBerries[index]()) {
            return GameConstants.BerryColor[App.game.farming.berryData[index].color];
        } else if (FarmController.getHint(index, true) !== '') {
            return GameConstants.BerryColor[8];
        } else {
            return GameConstants.BerryColor[9];
        }

    }

    public static getBerryImage(index: number) {
        return `assets/images/items/berry/${BerryType[index]}.png`;
    }

    public static getHint(index: number, checkSeen = false, checkUnlocked = false) {
        if (checkUnlocked && App.game.farming.unlockedBerries[index]()) {
            return '';
        }
        const mutation = App.game.farming.mutations.find(mutation => mutation.mutatedBerry === index && mutation.showHint);
        if (mutation) {
            if (checkSeen && !mutation.hintSeen) {
                return '';
            }
            return mutation.hint;
        }
        return '';
    }

    public static additionalInfoTooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        const tooltip = [];

        // External Auras
        App.game.farming.externalAuras.forEach((aura, idx) => {
            if (typeof aura === 'undefined') {
                return;
            }
            if (aura() !== 1) {
                tooltip.push(`${AuraType[idx]}: ×${aura().toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`);
            }

        });

        // Adding header if necessary
        if (tooltip.length) {
            tooltip.unshift('<u>External Auras</u>');
        }

        return tooltip.join('<br>');
    });

    // For preview in Farm Modal's BerryDex Tab
    public static handleBerryDexClick(berryId: number) {
        if (App.game.statistics.selectedBerryID() === berryId && App.game.farming.unlockedBerries[berryId]()) {
            $('#berryDexModal').modal('show');
        }

        App.game.statistics.selectedBerryID(berryId);
    }

    public static wandererToRoute(pokemon: PokemonNameType): RegionRoute {
        const maxRegion = player.highestRegion();
        const pokemonRegion = pokemonMap[pokemon].nativeRegion;
        const routes = Routes.getRoutesByRegion(maxRegion).filter(r => !r.ignoreRouteInCalculations);
        const minIndex = Math.floor((routes.length - 1) * pokemonRegion / (maxRegion + 2));
        const maxIndex = Math.floor((routes.length - 1) * (pokemonRegion + 2) / (maxRegion + 2));
        // Adds a bit of randomness so it is not always the same route
        const routeIndex = Rand.intBetween(minIndex, maxIndex);
        return routes[routeIndex];
    }

    public static getWandererStyle(plot: Plot): string {
        if (!plot.wanderer) {
            return '';
        }
        const pokemon = pokemonMap[plot.wanderer.name];
        const forgedID = `${pokemon.id}${plot.wanderer.shiny ? 's' : ''}`;
        return `${plot.wanderer.shiny ? 'url(\'assets/images/dynamic-background/pokemon/sparkle.png\'), ' :  ''}url('assets/images/dynamic-background/pokemon/${forgedID}.png')`;
    }

    public static getWandererCss(plot: Plot): string {
        if (!plot.wanderer) {
            return '';
        }
        if (plot.wanderer.fleeing()) {
            return 'walkDownFlee';
        } else if (plot.wanderer.distractTime() > 0) {
            return 'walkDownFlash';
        } else {
            return 'walkDown';
        }
    }

}

