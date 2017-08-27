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
        if (this.berry() == null) {
            return 1;
        }
        return 4 - Math.ceil(4 * this.timeLeft() / this.berry().harvestTime);
    }

    public formattedTimeLeft() {
        if (this.timeLeft() == 0) {
            return "Ready"
        }
        let sec_num = parseInt('' + this.timeLeft(), 10); // don't forget the second param
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }

}
