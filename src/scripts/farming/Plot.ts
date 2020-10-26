class Plot implements Saveable {
    saveKey = '';
    defaults = {
        isUnlocked: false,
        berry: BerryType.None,
        age: 0,
        mulch: MulchType.None,
        mulchTimeLeft: 0,
    };

    _isUnlocked: KnockoutObservable<boolean>;
    _berry: KnockoutObservable<BerryType>;
    _age: KnockoutObservable<number>;

    _mulch: KnockoutObservable<MulchType>;
    _mulchTimeLeft: KnockoutObservable<number>;

    _auras: KnockoutObservable<number>[];

    formattedTimeLeft: KnockoutComputed<string>;
    formattedMulchTimeLeft: KnockoutComputed<string>;
    formattedAuras: KnockoutComputed<string>;

    auraGrowth: KnockoutComputed<number>;
    auraHarvest: KnockoutComputed<number>;
    auraMutation: KnockoutComputed<number>;
    auraReplant: KnockoutComputed<number>;

    isEmpty: KnockoutComputed<boolean>;
    isMulched: KnockoutComputed<boolean>;
    stage: KnockoutComputed<number>;
    tooltip: KnockoutComputed<string>;
    notifications: FarmNotificationType[];

    constructor(isUnlocked: boolean, berry: BerryType, age: number, mulch: MulchType, mulchTimeLeft: number) {
        this._isUnlocked = ko.observable(isUnlocked);
        this._berry = ko.observable(berry);
        this._age = ko.observable(age);
        this._mulch = ko.observable(mulch);
        this._mulchTimeLeft = ko.observable(mulchTimeLeft);

        this._auras = [];
        this._auras[AuraType.Growth] = ko.observable(1);
        this._auras[AuraType.Harvest] = ko.observable(1);
        this._auras[AuraType.Mutation] = ko.observable(1);
        this._auras[AuraType.Replant] = ko.observable(1);

        this.formattedTimeLeft = ko.pureComputed(function () {
            if (this.berry === BerryType.None) {
                return '';
            }
            const growthTime = this.berryData.growthTime.find(t => this.age < t);
            const timeLeft = Math.ceil(growthTime - this.age);
            const growthMultiplier = App.game.farming.getGrowthMultiplier() * this.getGrowthMultiplier();
            return GameConstants.formatTime(timeLeft / growthMultiplier);
        }, this);

        this.formattedMulchTimeLeft = ko.pureComputed(function() {
            if (this.mulch === MulchType.None) {
                return '';
            }
            return GameConstants.formatTime(this.mulchTimeLeft);
        }, this);

        this.auraGrowth = ko.pureComputed(function() {
            return this.auras[AuraType.Growth];
        }, this);
        this.auraHarvest = ko.pureComputed(function() {
            return this.auras[AuraType.Harvest];
        }, this);
        this.auraMutation = ko.pureComputed(function() {
            return this.auras[AuraType.Mutation];
        }, this);
        this.auraReplant = ko.pureComputed(function() {
            return this.auras[AuraType.Replant];
        }, this);

        this.formattedAuras = ko.pureComputed(function() {
            const auraStr = [];
            if (this.auraGrowth() !== 1) {
                auraStr.push(`Growth: ${this.auraGrowth().toFixed(2)}x`);
            }

            if (this.auraHarvest() !== 1) {
                auraStr.push(`Harvest: ${this.auraHarvest().toFixed(2)}x`);
            }

            if (this.auraMutation() !== 1) {
                auraStr.push(`Mutation: ${this.auraMutation().toFixed(2)}x`);
            }

            if (this.auraReplant() !== 1) {
                auraStr.push(`Replant: ${this.auraReplant().toFixed(2)}x`);
            }
            return auraStr.join('<br/>');
        }, this);

        this.isEmpty = ko.pureComputed(function () {
            return this.berry === BerryType.None;
        }, this);

        this.stage = ko.pureComputed(function () {
            if (this.berry === BerryType.None) {
                return PlotStage.Seed;
            }
            return this.berryData.growthTime.findIndex(t => this.age < t);
        }, this);

        this.tooltip = ko.pureComputed(function() {

            const tooltip = [];

            if (this.berry !== BerryType.None) {

                tooltip.push(`<u>${BerryType[this.berry]}</u>`);

                const formattedTime = this.formattedTimeLeft();
                switch (this.stage()) {
                    case PlotStage.Seed:
                        tooltip.push(`${formattedTime} until sprout`);
                        break;
                    case PlotStage.Sprout:
                        tooltip.push(`${formattedTime} until grown`);
                        break;
                    case PlotStage.Taller:
                        tooltip.push(`${formattedTime} until bloom`);
                        break;
                    case PlotStage.Bloom:
                        tooltip.push(`${formattedTime} until ripe`);
                        break;
                    case PlotStage.Berry:
                        tooltip.push(`${formattedTime} until death`);
                        break;
                }
            }

            if (this.stage() >= PlotStage.Taller && this.berryData.aura) {
                tooltip.push('<u>Aura Emitted:</u>');
                tooltip.push(`${this.berryData.aura.getLabel(this.stage())}`);
            }

            const auraStr = this.formattedAuras();
            if (auraStr) {
                tooltip.push( '<u>Aura Received:</u>');
                tooltip.push(auraStr);
            }

            if (this.mulch !== MulchType.None) {
                const mulchTime = this.formattedMulchTimeLeft();
                tooltip.push('<u>Mulch</u>');
                tooltip.push(`${MulchType[this.mulch].replace('_Mulch','')} : ${mulchTime}`);
            }

            return tooltip.join('<br/>');
        }, this);

        this.notifications = [];
    }

    /**
     * Handles updating the berry plant
     * @param seconds Number of seconds to add to the plants age
     * @returns Whether the plot stage has changed this update
     */
    update(seconds: number): boolean {
        // Updating Berry
        let change = false;

        if (this.berry !== BerryType.None) {
            const growthTime = seconds * App.game.farming.getGrowthMultiplier() * this.getGrowthMultiplier();

            const oldAge = this.age;
            this.age += growthTime;


            const updatedStage = this.stageUpdated(oldAge, this.age);

            if (updatedStage !== PlotStage.Seed) {
                change = true;
            }

            if (updatedStage === PlotStage.Berry) {
                this.notifications.push(FarmNotificationType.Ripe);
                change = true;
            }

            if (this.age > this.berryData.growthTime[4]) {
                this.die();
                change = true;
            }
        }

        // Updating Mulch
        if (this.mulch !== MulchType.None) {
            this.mulchTimeLeft = Math.max(this.mulchTimeLeft - seconds, 0);
            if (this.mulchTimeLeft === 0) {
                this.notifications.push(FarmNotificationType.MulchRanOut);
                this.mulch = MulchType.None;
            }
        }

        return change;
    }

    private stageUpdated(oldAge: number, newAge: number): PlotStage {
        const oldStage = this.berryData.growthTime.findIndex(t => oldAge < t);
        const newStage = this.berryData.growthTime.findIndex(t => newAge < t);
        if (oldStage !== newStage) {
            return newStage;
        }
        return PlotStage.Seed;
    }

    /**
     * Returns how many berries will be harvested
     */
    harvest(): number {
        return this.berryData.harvestAmount * this.getHarvestMultiplier();
    }

    /**
     * Handles killing the berry plant
     * @param harvested Whether this death was due to the player harvesting manually, or by withering
     */
    die(harvested = false): void {
        if (harvested) {
            this.berry = BerryType.None;
            this.age = 0;
        } else {

            // Withered Berry plant drops half of the berries
            const amount = Math.floor(this.harvest() / 2);
            if (amount) {
                App.game.farming.gainBerry(this.berry, amount);
                this.notifications.push(FarmNotificationType.Dropped);
            }

            // Check if berry replants itself
            const replantChance = this.berryData.replantRate * App.game.farming.getReplantMultiplier() * this.getReplantMultiplier();
            if (Math.random() < replantChance) {
                this.age = 0;
                this.notifications.push(FarmNotificationType.Replanted);
                App.game.oakItems.use(OakItems.OakItem.Sprinklotad);
                return;
            }

            this.notifications.push(FarmNotificationType.Withered);

            // Check for Kasib replants
            if (App.game.farming.highestUnlockedBerry() > BerryType.Occa) {
                if (App.game.farming.plotList.every(plot => plot.berry !== BerryType.Colbur)) {
                    if (Math.random() < 0.05) {
                        this.notifications.push(FarmNotificationType.Mutated);
                        this.berry = BerryType.Kasib;
                        this.age = 0;
                        return;
                    }
                }
            }

            // Reset plant
            this.berry = BerryType.None;
            this.age = 0;
        }
    }

    /**
     * Gets the growth multiplier for this plot
     */
    getGrowthMultiplier(): number {
        let multiplier = 1;
        if (this.mulch === MulchType.Boost_Mulch) {
            multiplier = GameConstants.BOOST_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            multiplier =  GameConstants.AMAZE_MULCH_GROWTH_MULTIPLIER;
        }

        multiplier *= this._auras[AuraType.Growth]();

        return multiplier;
    }

    /**
     * Gets the harvest multiplier for this plot
     */
    getHarvestMultiplier(): number {
        let multiplier = 1;
        if (this.mulch === MulchType.Rich_Mulch) {
            multiplier = GameConstants.RICH_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            multiplier = GameConstants.AMAZE_MULCH_PRODUCE_MULTIPLIER;
        }

        multiplier *= this._auras[AuraType.Harvest]();

        return 1;
    }

    /**
     * Gets the replant multiplier for this plot
     */
    getReplantMultiplier(): number {
        let multiplier = 1;
        if (this.mulch === MulchType.Rich_Mulch) {
            multiplier = GameConstants.RICH_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            multiplier = GameConstants.AMAZE_MULCH_PRODUCE_MULTIPLIER;
        }

        multiplier *= this._auras[AuraType.Replant]();

        return 1;
    }

    /**
     * Gets the mutation multiplier for this plot
     */
    getMutationMultiplier(): number {
        let multiplier = 1;
        if (this.mulch === MulchType.Surprise_Mulch) {
            multiplier = GameConstants.SURPRISE_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            multiplier = GameConstants.AMAZE_MULCH_MUTATE_MULTIPLIER;
        }

        multiplier *= this._auras[AuraType.Mutation]();

        return 1;
    }

    addAura(auraType: AuraType, multiplier: number): void {
        const currentMultiplier = this._auras[auraType]();
        this._auras[auraType](currentMultiplier * multiplier);
    }

    clearAuras(): void {
        this._auras[AuraType.Growth](1);
        this._auras[AuraType.Harvest](1);
        this._auras[AuraType.Mutation](1);
        this._auras[AuraType.Replant](1);
    }

    applyAura(index: number): void {
        if (this.berry === BerryType.None) {
            return;
        }
        this.berryData.aura?.applyAura(index);
    }

    /**
     * Returns the tooltip for the plot
     */
    toolTip(): string {

        let tooltip = '';

        if (this.berry !== BerryType.None) {
            const formattedTime = this.formattedTimeLeft();
            switch (this.stage()) {
                case PlotStage.Seed:
                    tooltip = `${formattedTime} until sprout`;
                    break;
                case PlotStage.Sprout:
                    tooltip = `${formattedTime} until growth`;
                    break;
                case PlotStage.Taller:
                    tooltip = `${formattedTime} until bloom`;
                    break;
                case PlotStage.Bloom:
                    tooltip = `${formattedTime} until ripe`;
                    break;
                case PlotStage.Berry:
                    tooltip = `${formattedTime} until overripe`;
                    break;
            }
        }

        if (this.mulch !== MulchType.None) {
            const mulchTime = this.formattedMulchTimeLeft();
            if (tooltip) {
                tooltip += '<br/>';
            }
            tooltip += `${MulchType[this.mulch].replace('_Mulch','')} : ${mulchTime}`;
        }

        this._auras.forEach(function(aura: KnockoutObservable<number>, idx: number) {
            if (aura() === 1) {
                return;
            }
            if (tooltip) {
                tooltip += '<br/>';
            }
            tooltip += `${AuraType[idx]}: ${aura()}x`;
        }, this);

        return tooltip;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.isUnlocked = json['isUnlocked'] ?? this.defaults.isUnlocked;
        this.berry = json['berry'] ?? this.defaults.berry;
        this.age = json['age'] ?? this.defaults.age;
        this.mulch = json['mulch'] ?? this.defaults.mulch;
        this.mulchTimeLeft = json['mulchTimeLeft'] ?? this.defaults.mulchTimeLeft;
    }

    toJSON(): Record<string, any> {
        return {
            isUnlocked: this.isUnlocked,
            berry: this.berry,
            age: this.age,
            mulch: this.mulch,
            mulchTimeLeft: this.mulchTimeLeft,
        };
    }

    /**
     * Finds the plot indices that are around the plot in a 3x3 square
     * @param index The plot index
     * @param filter An optional filter callback for filtering out indices
     */
    public static findNearPlots(index: number, filter?: (n: number) => boolean): number[] {
        const plots = [];

        const colIdx = index % Farming.PLOT_WIDTH;
        const rowIdx = (index - colIdx) / Farming.PLOT_WIDTH;

        for (let r = rowIdx - 1;r <= rowIdx + 1;r++) {
            for (let c = colIdx - 1;c <= colIdx + 1;c++) {
                if (r < 0 || r > Farming.PLOT_WIDTH - 1 || c < 0 || c >  Farming.PLOT_WIDTH - 1) {
                    continue;
                }
                if (r === rowIdx && c === colIdx) {
                    continue;
                }
                const idx = r * Farming.PLOT_WIDTH + c;
                if (filter && !filter(idx)) {
                    continue;
                }
                plots.push(idx);
            }
        }

        return plots;
    }

    /**
     * Finds the plot indices that are directly next to the plot (aka a plus sign)
     * @param index The plot index
     * @param filter An optional filter callback for filtering out indices
     */
    public static findPlusPlots(index: number, filter?: (n: number) => boolean): number[] {
        const plots = [];

        const colIdx = index % Farming.PLOT_WIDTH;
        const rowIdx = (index - colIdx) / Farming.PLOT_WIDTH;

        const possiblePlots = [[rowIdx - 1, colIdx], [rowIdx, colIdx - 1], [rowIdx, colIdx + 1], [rowIdx + 1, colIdx]];

        return possiblePlots.filter(plot => {
            const [r, c] = plot;
            if (r < 0 || r > Farming.PLOT_WIDTH - 1 || c < 0 || c >  Farming.PLOT_WIDTH - 1) {
                return false;
            }
            const idx = r * Farming.PLOT_WIDTH + c;
            if (filter && !filter(idx)) {
                return false;
            }
            return true;
        }).map(plot => plot[0] * Farming.PLOT_WIDTH + plot[1]);
    }

    get berryData(): Berry {
        return App.game.farming.berryData[this.berry];
    }

    // Knockout getters
    get isUnlocked(): boolean {
        return this._isUnlocked();
    }

    set isUnlocked(value: boolean) {
        this._isUnlocked(value);
    }

    get berry(): BerryType {
        return this._berry();
    }

    set berry(berry: BerryType) {
        this._berry(berry);
    }

    get age(): number {
        return this._age();
    }

    set age(value: number) {
        this._age(value);
    }

    get mulch(): MulchType {
        return this._mulch();
    }

    set mulch(value: MulchType) {
        this._mulch(value);
    }

    get mulchTimeLeft(): number {
        return this._mulchTimeLeft();
    }

    set mulchTimeLeft(value: number) {
        this._mulchTimeLeft(value);
    }

    get auras(): number[] {
        return this._auras.map(aura => aura());
    }

}
