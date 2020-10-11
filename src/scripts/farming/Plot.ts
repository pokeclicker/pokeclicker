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
            if (this.berry === BerryType.None) { return ""; }
            for (let i = 0;i < 5;i++) {
                if (this.age < App.game.farming.berryData[this.berry].growthTime[i]) {
                    let timeLeft = Math.ceil(App.game.farming.berryData[this.berry].growthTime[i] - this.age);
                    return GameConstants.formatTime(timeLeft / App.game.farming.getGrowthMultiplier());
                }
            }
        }, this);

        this.formattedMulchTimeLeft = ko.pureComputed(function() {
            if (this.mulch === MulchType.None) { return ""; }
            return GameConstants.formatTime(mulchTimeLeft);
        })

        this.isEmpty = ko.pureComputed(function () {
            return this.berry === BerryType.None;
        }, this);

        this.stage = ko.pureComputed(function () {
            if (this.berry === BerryType.None) { return PlotStage.Seed; }
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
            let growthTime = seconds * App.game.farming.getGrowthMultiplier();
            if (this.mulch === MulchType.Boost_Mulch) {
                growthTime *= GameConstants.BOOST_MULCH_MULTIPLIER;
            } else if (this.mulch === MulchType.Amaze_Mulch) {
                growthTime *= GameConstants.AMAZE_MULCH_GROWTH_MULTIPLIER;
            }
    
            let oldAge = this.age;
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
            this.mulchTimeLeft = Math.min(this.mulchTimeLeft - seconds, 0);
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
        let amount = App.game.farming.berryData[this.berry].harvestAmount;

        if (this.mulch === MulchType.Rich_Mulch) {
            amount *= GameConstants.RICH_MULCH_MULTIPLIER;
        } else if (this.mulch === MulchType.Amaze_Mulch) {
            amount *= GameConstants.AMAZE_MULCH_PRODUCE_MULTIPLIER;
        }

        return amount;
    }

    /**
     * Handles killing the berry plant
     * @param harvested Whether this death was due to the player harvesting manually, or by withering
     */
    die(harvested: boolean = false): void {
        if (harvested) {
            this.berry = BerryType.None;
            this.age = 0;
        }
        else {

            // Withered Berry plant drops half of the berries
            let amount = Math.floor(this.harvest() / 2);
            if (amount) {
                App.game.farming.gainBerry(this.berry, amount);
                this.notifications.push(FarmNotificationType.Dropped);
            }

            // Check if berry replants itself
            let replantChance = App.game.farming.berryData[this.berry].replantRate;
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
     * Returns the tooltip for the plot
     */
    toolTip(): string {
        let formattedTime: string = this.formattedTimeLeft();
        switch(this.stage()) {
            case PlotStage.Seed:
            case PlotStage.Sprout:
            case PlotStage.Taller:
                return formattedTime + ' until growth';
            case PlotStage.Bloom:
                return formattedTime + ' until ripe';
            case PlotStage.Berry:
                return formattedTime + ' until overripe';
        }

        // TODO: Handle showing mulch time

        return "";
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.isUnlocked = json['isUnlocked'] ?? this.defaults.isUnlocked;
        this.berry = json['berry'] ?? this.defaults.berry;
        this.age = json['age'] ?? this.defaults.age;
    }

    toJSON(): Record<string, any> {
        return {
            isUnlocked: this.isUnlocked,
            berry: this.berry,
            age: this.age,
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
