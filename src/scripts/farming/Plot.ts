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
    formattedTimeLeft: KnockoutComputed<string>;
    formattedMulchTimeLeft: KnockoutComputed<string>;
    isEmpty: KnockoutComputed<boolean>;
    isMulched: KnockoutComputed<boolean>;
    stage: KnockoutComputed<number>;
    notifications: FarmNotificationType[];

    constructor(isUnlocked: boolean, berry: BerryType, age: number, mulch: MulchType, mulchTimeLeft: number) {
        this._isUnlocked = ko.observable(isUnlocked);
        this._berry = ko.observable(berry);
        this._age = ko.observable(age);
        this._mulch = ko.observable(mulch);
        this._mulchTimeLeft = ko.observable(mulchTimeLeft);

        this.formattedTimeLeft = ko.pureComputed(function () {
            if (this.berry === BerryType.None) {
                return '';
            }
            for (let i = 0;i < 5;i++) {
                if (this.age < App.game.farming.berryData[this.berry].growthTime[i]) {
                    const timeLeft = Math.ceil(App.game.farming.berryData[this.berry].growthTime[i] - this.age);
                    const growthMultiplier = App.game.farming.getGrowthMultiplier() * this.getGrowthMultiplier();
                    return GameConstants.formatTime(timeLeft / growthMultiplier);
                }
            }
        }, this);

        this.formattedMulchTimeLeft = ko.pureComputed(function() {
            if (this.mulch === MulchType.None) {
                return '';
            }
            return GameConstants.formatTime(this.mulchTimeLeft);
        }, this);

        this.isEmpty = ko.pureComputed(function () {
            return this.berry === BerryType.None;
        }, this);

        this.stage = ko.pureComputed(function () {
            if (this.berry === BerryType.None) {
                return PlotStage.Seed;
            }
            for (let i = 0;i < 5;i++) {
                if (this.age < App.game.farming.berryData[this.berry].growthTime[i]) {
                    return i;
                }
            }
        }, this);

        this.notifications = [];
    }

    /**
     * Handles updating the berry plant
     * @param seconds Number of seconds to add to the plants age
     */
    update(seconds: number) {
        // Updating Berry
        if (this.berry !== BerryType.None) {
            const growthTime = seconds * App.game.farming.getGrowthMultiplier() * this.getGrowthMultiplier();
    
            const oldAge = this.age;
            this.age += growthTime;
    
            if (oldAge <= App.game.farming.berryData[this.berry].growthTime[3] && this.age > App.game.farming.berryData[this.berry].growthTime[3]) {
                this.notifications.push(FarmNotificationType.Ripe);
            }
    
            if (this.age > App.game.farming.berryData[this.berry].growthTime[4]) {
                this.die();
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

    }

    /**
     * Returns how many berries will be harvested
     */
    harvest(): number {
        return App.game.farming.berryData[this.berry].harvestAmount * this.getHarvestMultiplier();
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
            const replantChance = App.game.farming.berryData[this.berry].replantRate;
            // TODO: Handle Sprinklotad Oak Item
            if (Math.random() < replantChance) {
                this.age = 0;
                this.notifications.push(FarmNotificationType.Replanted);
                return;
            }

            // Reset plant
            this.notifications.push(FarmNotificationType.Withered);
            this.berry = BerryType.None;
            this.age = 0;
        }
    }

    /**
     * Gets the growth multiplier for this plot
     */
    getGrowthMultiplier(): number {
        if (this.mulch === MulchType.Boost_Mulch) {
            return GameConstants.BOOST_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            return GameConstants.AMAZE_MULCH_GROWTH_MULTIPLIER;
        }

        return 1;
    }

    /**
     * Gets the harvest multiplier for this plot
     */
    getHarvestMultiplier(): number {
        if (this.mulch === MulchType.Rich_Mulch) {
            return GameConstants.RICH_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            return GameConstants.AMAZE_MULCH_PRODUCE_MULTIPLIER;
        }

        return 1;
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
                case PlotStage.Sprout:
                case PlotStage.Taller:
                    tooltip = `${formattedTime} until growth`;
                case PlotStage.Bloom:
                    tooltip = `${formattedTime} until ripe`;
                case PlotStage.Berry:
                    tooltip = `${formattedTime} until overripe`;
            }
        }

        if (this.mulch !== MulchType.None) {
            const mulchTime = this.formattedMulchTimeLeft();
            if (tooltip) {
                tooltip += '<br/>';
            }
            tooltip += `${MulchType[this.mulch].replace('_Mulch','')} : ${mulchTime}`;
        }

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

    // Knockout getters/setters
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

    get mulch(): number {
        return this._mulch();
    }

    set mulch(value: number) {
        this._mulch(value);
    }

    get mulchTimeLeft(): number {
        return this._mulchTimeLeft();
    }

    set mulchTimeLeft(value: number) {
        this._mulchTimeLeft(value);
    }
}
