class KeyItem {
    public name: KnockoutObservable<string>;
    public description: KnockoutObservable<string>;
    public unlockReq: KnockoutComputed<boolean>;
    public unlocker: KnockoutSubscription;

    constructor(name: string, description: string, unlockReq?) {
        this.name = ko.observable(name);
        this.description = ko.observable(description);
        this.unlockReq = ko.computed<boolean>(unlockReq);


        if(this.isUnlocked() || unlockReq == undefined) {
            return;
        }
            console.log("Add subscription");
            this.unlocker = this.unlockReq.subscribe(() => {
                console.log("Triggered");
                if (this.unlockReq()) {
                    console.log("Achieved");
                    player.gainKeyItem(this.name());
                    this.unlocker.dispose();
                }
            })

    }

    public isUnlocked(): boolean {
        return player.hasKeyItem(this.name());
    }

}

