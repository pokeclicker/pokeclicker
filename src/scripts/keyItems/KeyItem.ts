class KeyItem {
    private _name: KnockoutObservable<KeyItems.KeyItem>;
    private _description: KnockoutObservable<string>;
    private _isUnlocked: KnockoutObservable<boolean>;

    public unlockReq: KnockoutComputed<boolean>;
    public unlocker: KnockoutSubscription;

    constructor(name: KeyItems.KeyItem, description: string, unlockReq?, isUnlocked?: boolean) {
        this._name = ko.observable(name);
        this._description = ko.observable(description);
        this._isUnlocked = ko.observable(isUnlocked ?? false);

        if (this.isUnlocked || unlockReq == undefined) {
            this.unlockReq = null;
            return;
        }
        // This computed is disposed by unlock()
        this.unlockReq = ko.computed<boolean>(unlockReq);
        this.unlocker = this.unlockReq.subscribe(() => {
            if (this.unlockReq()) {
                App.game.keyItems.gainKeyItem(this.name);
            }
        });
    }

    unlock() {
        this.isUnlocked = true;
        if (this.unlocker) {
            this.unlocker.dispose();
        }
    }

    get displayName() {
        return GameConstants.humanifyString(KeyItems.KeyItem[this.name]);
    }

    get name() {
        return this._name();
    }

    get description() {
        return this._description();
    }

    get isUnlocked() {
        return this._isUnlocked();
    }

    set isUnlocked(bool: boolean) {
        this._isUnlocked(bool);
    }
}

