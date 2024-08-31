/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Saveable.d.ts" />

class BlendingSlot implements Saveable {
    saveKey = '';
    defaults = {
        isUnlocked: false,
        berry: BerryType.None,
    };

    _isUnlocked: KnockoutObservable<boolean>;
    _berry: KnockoutObservable<BerryType>;

    isEmpty: KnockoutComputed<boolean>;

    constructor(isUnlocked: boolean, berry: BerryType, public index) {
        this._isUnlocked = ko.observable(isUnlocked);
        this._berry = ko.observable(berry).extend({ numeric: 0 });
        this.isEmpty = ko.pureComputed(() => {
            return this.berry === BerryType.None;
        });
    }

    insertBerry(berry: BerryType): void {
        this.berry = berry;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.isUnlocked = json.isUnlocked ?? this.defaults.isUnlocked;
        this.berry = json.berry ?? this.defaults.berry;
    }

    toJSON(): Record<string, any> {
        return {
            isUnlocked: this.isUnlocked,
            berry: this.berry,
        };
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
}
