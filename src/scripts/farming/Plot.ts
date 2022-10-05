class Plot implements Saveable {
    saveKey = '';
    defaults = {
        isUnlocked: false,
        berry: BerryType.None,
        age: 0,
        mulch: MulchType.None,
        mulchTimeLeft: 0,
        isSafeLocked: false,
    };

    _isUnlocked: KnockoutObservable<boolean>;
    _isSafeLocked: KnockoutObservable<boolean>;
    _berry: KnockoutObservable<BerryType>;
    _lastPlanted: KnockoutObservable<BerryType>;
    _age: KnockoutObservable<number>;

    _mulch: KnockoutObservable<MulchType>;
    _mulchTimeLeft: KnockoutObservable<number>;

    _hasWarnedAboutToWither: boolean;

    formattedStageTimeLeft: KnockoutComputed<string>;
    formattedTimeLeft: KnockoutComputed<string>;
    formattedMulchTimeLeft: KnockoutComputed<string>;
    formattedAuras: KnockoutComputed<string>;

    auraGrowth: KnockoutComputed<number>;
    auraHarvest: KnockoutComputed<number>;
    auraMutation: KnockoutComputed<number>;
    auraReplant: KnockoutComputed<number>;
    auraDeath: KnockoutComputed<number>;
    auraBoost: KnockoutComputed<number>;

    isEmpty: KnockoutComputed<boolean>;
    isMulched: KnockoutComputed<boolean>;
    stage: KnockoutComputed<number>;
    tooltip: KnockoutComputed<string>;
    notifications: FarmNotificationType[];

    emittingAura: {
        type: KnockoutComputed<AuraType | null>,
        value: KnockoutComputed<number | null>,
    }

    constructor(isUnlocked: boolean, berry: BerryType, age: number, mulch: MulchType, mulchTimeLeft: number, public index) {
        this._isUnlocked = ko.observable(isUnlocked);
        this._isSafeLocked = ko.observable(false);
        this._berry = ko.observable(berry).extend({ numeric: 0 });
        this._lastPlanted = ko.observable(berry).extend({ numeric: 0 });
        this._age = ko.observable(age).extend({ numeric: 3 });
        this._mulch = ko.observable(mulch).extend({ numeric: 0 });
        this._mulchTimeLeft = ko.observable(mulchTimeLeft).extend({ numeric: 3 });

        this.emittingAura = {
            type: ko.pureComputed(() => {
                if (this.stage() < PlotStage.Taller || this.mulch === MulchType.Freeze_Mulch) {
                    return null;
                }

                return this.berryData?.aura?.auraType ?? null;
            }).extend({ rateLimit: 50 }),
            value: ko.pureComputed(() => {
                if (!this.berryData?.aura) {
                    return null;
                }

                const boost = this.auraBoost();
                const value = this.berryData.aura.getAuraValue(this.stage());
                return value > 1 ? value * boost : value / boost;
            }).extend({ rateLimit: 50 }),
        };

        this.formattedStageTimeLeft = ko.pureComputed(() => {
            if (this.berry === BerryType.None) {
                return '';
            }
            const growthTime = this.berryData.growthTime.find(t => this.age < t);
            const timeLeft = Math.ceil(growthTime - this.age);
            const growthMultiplier = App.game.farming.getGrowthMultiplier() * this.getGrowthMultiplier();
            return GameConstants.formatTime(timeLeft / growthMultiplier);
        });

        this.formattedTimeLeft = ko.pureComputed(() => {
            if (this.berry === BerryType.None) {
                return '';
            }
            let timeLeft = 0;
            if (this.age < this.berryData.growthTime[3]) {
                timeLeft = Math.ceil(this.berryData.growthTime[3] - this.age);
            } else {
                timeLeft = Math.ceil(this.berryData.growthTime[4] - this.age);
            }
            const growthMultiplier = App.game.farming.getGrowthMultiplier() * this.getGrowthMultiplier();
            return GameConstants.formatTime(timeLeft / growthMultiplier);
        });

        this.formattedMulchTimeLeft = ko.pureComputed(() => {
            if (this.mulch === MulchType.None) {
                return '';
            }
            return GameConstants.formatTime(this.mulchTimeLeft);
        });

        this.auraGrowth = ko.pureComputed(() => {
            return this.multiplyNeighbourAura(AuraType.Growth);
        });
        this.auraHarvest = ko.pureComputed(() => {
            return this.multiplyNeighbourAura(AuraType.Harvest);
        });
        this.auraMutation = ko.pureComputed(() => {
            return this.multiplyNeighbourAura(AuraType.Mutation);
        });
        this.auraReplant = ko.pureComputed(() => {
            return this.multiplyNeighbourAura(AuraType.Replant);
        });
        this.auraDeath = ko.pureComputed(() => {
            return this.berry === BerryType.Kasib ? 1 : this.maxNeighbourAura(AuraType.Death);
        });
        this.auraBoost = ko.pureComputed(() => {
            return this.berry === BerryType.Lum ? 1 : this.maxNeighbourAura(AuraType.Boost);
        });

        this.formattedAuras = ko.pureComputed(() => {
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

            if (this.auraDeath() !== 1) {
                auraStr.push(`Death: ${this.auraDeath().toFixed(2)}x`);
            }

            if (this.auraBoost() !== 1) {
                auraStr.push(`Boost: ${this.auraBoost().toFixed(2)}x`);
            }
            return auraStr.join('<br/>');
        });

        this.isEmpty = ko.pureComputed(() => {
            return this.berry === BerryType.None;
        });

        this.stage = ko.pureComputed(() => {
            if (this.berry === BerryType.None) {
                return PlotStage.Seed;
            }
            return this.berryData.growthTime.findIndex(t => this.age <= t);
        });

        this.tooltip = ko.pureComputed(() => {
            const tooltip = [];

            // Time
            if (this.berry !== BerryType.None) {

                tooltip.push(`<u>${BerryType[this.berry]}</u>`);

                // Petaya Effect
                if (App.game.farming.berryInFarm(BerryType.Petaya, PlotStage.Berry, true) && this.berry !== BerryType.Petaya && this.stage() == PlotStage.Berry) {
                    tooltip.push('∞ until death');
                // Normal Time
                } else {
                    const timeType = Settings.getSetting('farmDisplay').observableValue();
                    if (timeType === 'nextStage') {
                        const formattedTime = this.formattedStageTimeLeft();
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
                    } else {
                        const formattedTime = this.formattedTimeLeft();
                        switch (this.stage()) {
                            case PlotStage.Seed:
                            case PlotStage.Sprout:
                            case PlotStage.Taller:
                            case PlotStage.Bloom:
                                tooltip.push(`${formattedTime} until ripe`);
                                break;
                            case PlotStage.Berry:
                                tooltip.push(`${formattedTime} until death`);
                                break;
                        }
                    }
                }
            }

            // Aura

            if (this.emittingAura.type() !== null) {
                tooltip.push('<u>Aura Emitted:</u>');
                tooltip.push(`${AuraType[this.emittingAura.type()]}: ${this.emittingAura.value().toFixed(2)}x`);
            }
            const auraStr = this.formattedAuras();
            if (auraStr) {
                tooltip.push('<u>Aura Received:</u>');
                tooltip.push(auraStr);
            }

            // Mulch
            if (this.mulch !== MulchType.None) {
                const mulchTime = this.formattedMulchTimeLeft();
                tooltip.push('<u>Mulch</u>');
                tooltip.push(`${MulchType[this.mulch].replace('_Mulch','')} : ${mulchTime}`);
            }

            return tooltip.join('<br/>');
        });

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

            // Checking for Petaya Berries
            if (App.game.farming.berryInFarm(BerryType.Petaya, PlotStage.Berry, true) && this.berry !== BerryType.Petaya) {
                this.age = Math.min(this.age, this.berryData.growthTime[3] + 1);
            }

            const updatedStage = this.stageUpdated(oldAge, this.age);

            if (updatedStage !== PlotStage.Seed) {
                change = true;
            }

            if (updatedStage === PlotStage.Berry) {
                this.notifications.push(FarmNotificationType.Ripe);
                change = true;
            }

            if (!this._hasWarnedAboutToWither && this.age + 15 > this.berryData.growthTime[4]) {
                this.notifications.push(FarmNotificationType.AboutToWither);
                this._hasWarnedAboutToWither = true;
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
     * Handles planting a berry on the plot
     * @param berry The BerryType
     */
    plant(berry: BerryType): void {
        this.berry = berry;
        this.lastPlanted = berry;
        this.age = 0;
        this.notifications = [];
        this._hasWarnedAboutToWither = false;
    }

    /**
     * Returns how many berries will be harvested
     */
    harvestAmount(): number {
        return Math.floor(Math.max(1, this.berryData.harvestAmount * this.getHarvestMultiplier()));
    }

    /**
     * Handles killing the berry plant
     * @param harvested Whether this death was due to the player harvesting manually, or by withering
     */
    die(harvested = false): void {
        if (!harvested) {
            // Withered Berry plant drops half of the berries
            const amount = Math.max(1, Math.ceil(this.harvestAmount() / 2));
            if (amount) {
                App.game.farming.gainBerry(this.berry, amount);
                this.notifications.push(FarmNotificationType.Dropped);
            }

            // Check if berry replants itself
            const replantChance = this.berryData.replantRate * App.game.farming.getReplantMultiplier() * this.getReplantMultiplier();
            if (Rand.chance(replantChance)) {
                this.age = 0;
                this.notifications.push(FarmNotificationType.Replanted);
                App.game.oakItems.use(OakItemType.Sprinklotad);
                GameHelper.incrementObservable(App.game.statistics.totalBerriesReplanted, 1);
                return;
            }

            this.notifications.push(FarmNotificationType.Withered);

            // Check for Kasib berry mutation/replant chance
            if (App.game.farming.highestUnlockedBerry() >= BerryType.Occa) {
                if (!App.game.farming.berryInFarm(BerryType.Colbur)) {
                    if (Rand.chance(0.05)) {
                        this.notifications.push(FarmNotificationType.Mutated);
                        this.berry = BerryType.Kasib;
                        this.age = 0;
                        App.game.farming.unlockBerry(BerryType.Kasib);
                        return;
                    }
                }
            }
        }

        // Reset plant
        this.berry = BerryType.None;
        this.age = 0;
    }

    generateWanderPokemon(): any {
        // Check if plot is eligible for wandering Pokemon
        if (!this.isUnlocked || this.berry === BerryType.None || this.stage() !== PlotStage.Berry) {
            return undefined;
        }
        // Chance to generate wandering Pokemon
        if (Rand.chance(GameConstants.WANDER_RATE * App.game.farming.externalAuras[AuraType.Attract]())) {
            // Get a random Pokemon from the list of possible encounters
            const availablePokemon: PokemonNameType[] = this.berryData.wander.filter(pokemon => PokemonHelper.calcNativeRegion(pokemon) <= player.highestRegion());
            const wanderPokemon = Rand.fromArray(availablePokemon);

            const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_FARM);

            // Add to log book
            if (shiny) {
                App.game.logbook.newLog(LogBookTypes.SHINY, `A shiny ${wanderPokemon} has wandered onto the farm! ${App.game.party.alreadyCaughtPokemonByName(wanderPokemon, true) ? '(duplicate)' : ''}`);
            } else {
                App.game.logbook.newLog(LogBookTypes.WANDER, `A wild ${wanderPokemon} has wandered onto the farm!`);
            }

            // Gain Pokemon
            App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(wanderPokemon).id, shiny, true);
            const partyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(wanderPokemon).id);
            partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, shiny, GameConstants.WANDERER_EP_YIELD);

            // Check for Starf berry generation
            if (shiny) {
                const emptyPlots = App.game.farming.plotList.filter(plot => plot.isUnlocked && plot.isEmpty());
                // No Starf generation if no empty plots :(
                if (emptyPlots.length) {
                    const chosenPlot = emptyPlots[Rand.floor(emptyPlots.length)];
                    chosenPlot.plant(BerryType.Starf);
                    App.game.farming.unlockBerry(BerryType.Starf);
                }
            }

            return {pokemon: wanderPokemon, shiny: shiny};
        }
        return undefined;
    }

    /**
     * Gets the growth multiplier for this plot
     */
    getGrowthMultiplier(): number {
        let multiplier = {
            [MulchType.Boost_Mulch]: GameConstants.BOOST_MULCH_MULTIPLIER,
            [MulchType.Amaze_Mulch]: GameConstants.AMAZE_MULCH_GROWTH_MULTIPLIER,
            [MulchType.Freeze_Mulch]: GameConstants.FREEZE_MULCH_MULTIPLIER,
        }[this.mulch] ?? 1;

        multiplier *= this.auraGrowth();

        // Handle Death Aura
        if (this.stage() == PlotStage.Berry && this.berry != BerryType.Kasib) {
            multiplier *= this.auraDeath();
        }

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

        multiplier *= this.auraHarvest();

        return multiplier;
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

        multiplier *= this.auraReplant();

        return multiplier;
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

        multiplier *= this.auraMutation();

        return multiplier;
    }

    private multiplyNeighbourAura(auraType: AuraType): number {
        return this.neighbours()
            .filter(p => p.emittingAura.type() === auraType)
            .reduce((acc, plot) => acc * (plot.emittingAura.value() ?? 1), 1);
    }

    private maxNeighbourAura(auraType: AuraType): number {
        return Math.max(1, ...this.neighbours().filter(p => p.emittingAura.type() === auraType).map(p => p.emittingAura.value() ?? 1));
    }

    /**
     * returns true if the plot had mulch.
     */
    clearMulch(): boolean {
        const wasMulched = this.mulch != MulchType.None;
        if (wasMulched) {
            this.mulch = MulchType.None;
            this.mulchTimeLeft = 0;
        }
        return wasMulched;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.isUnlocked = json.isUnlocked ?? this.defaults.isUnlocked;
        this.berry = json.berry ?? this.defaults.berry;
        this.age = json.age ?? this.defaults.age;
        this.mulch = json.mulch ?? this.defaults.mulch;
        this.mulchTimeLeft = json.mulchTimeLeft ?? this.defaults.mulchTimeLeft;
        this.lastPlanted = json.lastPlanted ?? json.berry ?? this.defaults.berry;
        this.isSafeLocked = json.isSafeLocked ?? this.defaults.isSafeLocked;
    }

    toJSON(): Record<string, any> {
        return {
            isUnlocked: this.isUnlocked,
            berry: this.berry,
            lastPlanted: this.lastPlanted,
            age: this.age,
            mulch: this.mulch,
            mulchTimeLeft: this.mulchTimeLeft,
            isSafeLocked: this.isSafeLocked,
        };
    }

    /**
     * Finds the plot indices that are around the plot in a 3x3 square
     * @param index The plot index
     */
    public static findNearPlots(index: number): number[] {
        const plots = [];

        const posX = index % GameConstants.FARM_PLOT_WIDTH;
        const posY = (index - posX) / GameConstants.FARM_PLOT_HEIGHT;

        for (let y = posY - 1; y <= posY + 1; y++) {
            for (let x = posX - 1; x <= posX + 1; x++) {
                if (y < 0 || y > GameConstants.FARM_PLOT_HEIGHT - 1 || x < 0 || x >  GameConstants.FARM_PLOT_WIDTH - 1) {
                    continue;
                }
                if (y === posY && x === posX) {
                    continue;
                }
                const id = y * GameConstants.FARM_PLOT_HEIGHT + x;
                plots.push(id);
            }
        }

        return plots;
    }

    public neighbours(): Plot[] {
        return Plot.findNearPlots(this.index).map(i => App.game.farming.plotList[i]);
    }

    /**
     * Finds the plot indices that are directly next to the plot (aka a plus sign)
     * @param index The plot index
     */
    public static findPlusPlots(index: number, filter?: (n: number) => boolean): number[] {
        const posX = index % GameConstants.FARM_PLOT_WIDTH;
        const posY = (index - posX) / GameConstants.FARM_PLOT_HEIGHT;

        const possiblePlots = [[posY - 1, posX], [posY, posX - 1], [posY, posX + 1], [posY + 1, posX]];

        return possiblePlots.filter(([y, x]) => {
            return y >= 0 && y < GameConstants.FARM_PLOT_HEIGHT && x >= 0 && x < GameConstants.FARM_PLOT_WIDTH;
        }).map(([y, x]) => y * GameConstants.FARM_PLOT_HEIGHT + x);
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

    get isSafeLocked(): boolean {
        return this._isSafeLocked();
    }

    set isSafeLocked(value: boolean) {
        this._isSafeLocked(value);
    }

    get berry(): BerryType {
        return this._berry();
    }

    set berry(berry: BerryType) {
        this._berry(berry);
    }

    get lastPlanted(): BerryType {
        return this._lastPlanted();
    }

    set lastPlanted(berry: BerryType) {
        this._lastPlanted(berry);
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

}
