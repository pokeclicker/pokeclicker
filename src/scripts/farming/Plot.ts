class Plot implements Saveable {
    saveKey = '';
    defaults = {
        isUnlocked: false,
        boosted: false,
        berry: BerryType.None,
        timeLeft: 0,
    };

    _isUnlocked: KnockoutObservable<boolean>;
    _boosted: KnockoutObservable<boolean>;
    _berry: KnockoutObservable<BerryType>;
    _timeLeft: KnockoutObservable<number>;
    formattedTimeLeft: KnockoutComputed<string>;
    isEmpty: KnockoutComputed<boolean>;
    stage: KnockoutComputed<number>;

    constructor(isUnlocked: boolean, boosted: boolean, berry: BerryType, timeLeft: number) {
        this._isUnlocked = ko.observable(isUnlocked);
        this._boosted = ko.observable(boosted);
        this._berry = ko.observable(berry);
        this._timeLeft = ko.observable(timeLeft);

        this.formattedTimeLeft = ko.pureComputed(function () {
            return GameConstants.formatTime(Math.ceil(this.timeLeft) / App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck));
        }, this);
        this.isEmpty = ko.pureComputed(function () {
            return this.berry == BerryType.None;
        }, this);
        this.stage = ko.pureComputed(function () {
            if (this.berry === BerryType.None) {
                return 1;
            }
            return 4 - Math.ceil(4 * this.timeLeft / App.game.farming.berryData[this.berry].harvestTime);
        }, this);

    }

    reduceTime(seconds: number) {
        this.timeLeft = Math.max(0, this.timeLeft - seconds);
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.isUnlocked = json['isUnlocked'] ?? this.defaults.isUnlocked;
        this.boosted = json['boosted'] ?? this.defaults.boosted;
        this.berry = json['berry'] ?? this.defaults.berry;
        this.timeLeft = json['timeLeft'] ?? this.defaults.timeLeft;
    }

    toJSON(): Record<string, any> {
        return {
            isUnlocked: this.isUnlocked,
            boosted: this.boosted,
            berry: this.berry,
            timeLeft: this.timeLeft,
        };
    }

    // Knockout getters/setters
    get isUnlocked(): boolean {
        return this._isUnlocked();
    }

    set isUnlocked(value: boolean) {
        this._isUnlocked(value);
    }

    get boosted(): boolean {
        return this._boosted();
    }

    set boosted(value: boolean) {
        this._boosted(value);
    }

    get berry(): BerryType {
        return this._berry();
    }

    set berry(berry: BerryType) {
        this._berry(berry);
    }

    get timeLeft(): number {
        return this._timeLeft();
    }

    set timeLeft(value: number) {
        this._timeLeft(value);
    }
}
