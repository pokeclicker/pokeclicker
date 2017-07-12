class KeyItem {
    public name: KnockoutObservable<string>;
    public description: KnockoutObservable<string>;
    public unlockReq: KnockoutComputed<boolean>;
    public unlocker: KnockoutSubscription;

    constructor(name: string, description: string, unlockReq: Function) {
        this.name = ko.observable(name);
        this.description = ko.observable(description);
        this.unlockReq = ko.computed<boolean>(unlockReq);

        if(!this.isUnlocked()) {
            this.unlocker = this.unlockReq().subscribe(() => {
                if (this.unlockReq()) {
                    console.log("Achieved");
                    this.unlocker.dispose();
                }
            })
        }
    }

    public isUnlocked(): boolean {
        return player.hasKeyItem(this.name);
    }

}

