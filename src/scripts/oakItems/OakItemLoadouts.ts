/// <reference path="../../declarations/GameHelper.d.ts" />

class OakItemLoadouts {
    defaults = {
        available: 0,
    }

    loadouts: OakItems.OakItem[][];


    //Number of Loadouts Available
    private _available: KnockoutObservable<number>;

    constructor() {
        this._available = ko.observable(0);
        this.loadouts = [[OakItems.OakItem.Amulet_Coin],[],[]];
    }

    activateLoadout(num: number) {
        App.game.oakItems.deactivateAll();
        this.loadouts[num - 1].forEach((item: OakItems.OakItem) => {
            App.game.oakItems.activate(item);
        });
    }

    addItemToLoadout(num: number, item: OakItems.OakItem) {
        if (this.loadouts[num - 1].length < 3) {
            this.loadouts[num - 1].push(item);
        }
    }

    isPartOfLoadout(num: number, item: OakItems.OakItem) {
        this.loadouts[num - 1].forEach(currItem => {
            if (currItem == item) {
                return true;
            }
        });

        return false;
    }

    clearLoadout(num: number) {
        this.loadouts[num - 1] = [];
    }

    openLoadoutModal() {
        $('#OakItemLoadoutModal').modal('show');
    }

    // Knockout getters/setters
    get available() {
        return this._available();
    }

    set available(val: number) {
        this._available(val);
    }
}
