class KeyItem {
    public name: KnockoutObservable<string>;
    public description: KnockoutObservable<string>;
    public unlockReq: Function;


    constructor(name: string, description: string, unlockReq: Function) {
        this.name = ko.observable(name);
        this.description = ko.observable(description);
        this.unlockReq = unlockReq;
    }

    public isUnlocked(): boolean {
        return player.hasKeyItem(this.name);
    }

}


let Shardcase: KeyItem = new KeyItem("Shard case", "Description", function () {
    player.money > 1;
});