class Plot {
    public isUnlocked: boolean;
    public exp: number;
    public level: number;
    public boosted: boolean;
    public berry: KnockoutObservable<Berry>;
    public timeLeft: KnockoutObservable<number>;
    public isEmpty: KnockoutComputed<boolean>;

    constructor(isUnlocked: boolean, exp: number, level: number, boosted: boolean, berry: Berry, timeLeft: number) {
        this.isUnlocked = isUnlocked;
        this.exp = exp;
        this.level = level;
        this.boosted = boosted;
        this.berry = ko.observable(berry);
        this.timeLeft = ko.observable(timeLeft);
        this.isEmpty = ko.computed(function () {
            return this.berry() == null;
        }, this);
    }

    public getStage() {
        return 5 - Math.ceil(5 * this.timeLeft() / this.berry().harvestTime);
    }

}
