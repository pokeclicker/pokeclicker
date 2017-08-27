class Plot {
    public isUnlocked: boolean;
    public exp: number;
    public level: number;
    public boosted: boolean;
    public berry: KnockoutObservable<Berry>;
    public timeLeft: KnockoutObservable<number>;
    public formattedTimeLeft: KnockoutObservable<string>;
    public isEmpty: KnockoutComputed<boolean>;

    constructor(isUnlocked: boolean, exp: number, level: number, boosted: boolean, berry: Berry, timeLeft: number) {
        this.isUnlocked = isUnlocked;
        this.exp = exp;
        this.level = level;
        this.boosted = boosted;
        this.berry = ko.observable(berry);
        this.timeLeft = ko.observable(timeLeft);
        this.formattedTimeLeft = ko.observable(GameConstants.formatTime(this.timeLeft()));
        this.isEmpty = ko.computed(function () {
            return this.berry() == null;
        }, this);
    }

    public getStage() {
        if (this.berry() == null) {
            return 1;
        }
        return 4 - Math.ceil(4 * this.timeLeft() / this.berry().harvestTime);
    }



}
