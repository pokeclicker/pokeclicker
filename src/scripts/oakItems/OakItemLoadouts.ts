/// <reference path="../../declarations/GameHelper.d.ts" />

class OakItemLoadouts{
    defaults = {
        available: 0
    }

    loadouts: OakItems.OakItem[][];


    //Number of Loadouts Available
    private _available: KnockoutObservable<number>;

    constructor() {
        this._available = ko.observable(0);
        this.loadouts = [[OakItems.OakItem.Poison_Barb, OakItems.OakItem.Amulet_Coin, OakItems.OakItem.Magic_Ball]];
    }

    activateLoadout(num: number) {
        App.game.oakItems.deactivateAll();
        this.loadouts[num - 1].forEach((item: OakItems.OakItem) => {
            App.game.oakItems.activate(item)
        });
    }

    addItemToLoadout(num: number, item: OakItems.OakItem) {
        if (this.loadouts[num - 1].length < 3) {
            this.loadouts[num - 1].push(item)
        } 
    }

    clearLoadout(num: number) {
        this.loadouts[num - 1] = []
    }

    openLoadoutModal() {
        $('#oakItemLoadoutModal').modal('show');
    }
    
    // Knockout getters/setters
    get available() {
        return this._available();
    }

    set available(val: number) {
        this._available(val);
    }
}