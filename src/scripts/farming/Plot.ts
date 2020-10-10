class Plot implements Saveable {
    saveKey = '';
    defaults = {
        isUnlocked: false,
        berry: BerryType.None,
        age: 0,
    };

    _isUnlocked: KnockoutObservable<boolean>;
    _berry: KnockoutObservable<BerryType>;
    _age: KnockoutObservable<number>;
    formattedTimeLeft: KnockoutComputed<string>;
    isEmpty: KnockoutComputed<boolean>;
    stage: KnockoutComputed<number>;
    notifications: FarmNotificationType[];

    constructor(isUnlocked: boolean, berry: BerryType, age: number) {
        this._isUnlocked = ko.observable(isUnlocked);
        this._berry = ko.observable(berry);
        this._age = ko.observable(age);

        this.formattedTimeLeft = ko.pureComputed(function () {
            if (this.berry === BerryType.None) { return ""; }
            for (let i = 0;i < 5;i++) {
                if (this.age < App.game.farming.berryData[this.berry].growthTime[i]) {
                    let timeLeft = Math.ceil(App.game.farming.berryData[this.berry].growthTime[i] - this.age);
                    return GameConstants.formatTime(timeLeft / App.game.farming.getGrowthMultiplier());
                }
            }
        }, this);

        this.isEmpty = ko.pureComputed(function () {
            return this.berry == BerryType.None;
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
        if (this.berry == BerryType.None) { return; }

        let oldAge = this.age;
        this.age += seconds;

        if (oldAge <= App.game.farming.berryData[this.berry].growthTime[3] && this.age > App.game.farming.berryData[this.berry].growthTime[3]) {
            this.notifications.push(FarmNotificationType.Ripe);
        }

        if (this.age > App.game.farming.berryData[this.berry].growthTime[4]) {
            this.die();
        }
    }

    /**
     * Returns how many berries will be harvested
     */
    harvest(): number {
        let amount = App.game.farming.berryData[this.berry].harvestAmount;

        // TODO: Add multiplier on harvest amount

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
            this.notifications = [];
        }
        else {
            // TODO: Determine if berry will be replanted
            // TODO: Notify
            // TODO: Determine if berry dropped
            this.berry = BerryType.None;
            this.age = 0;
            this.notifications = [];
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
}
