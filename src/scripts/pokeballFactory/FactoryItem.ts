class FactoryItem {
    private _timeLeft: KnockoutObservable<number> = ko.observable(0);
    public gain: number;
    public name: any;

    constructor(name: any, timeLeft: number, gain: number) {
        this.name = name;
        this.timeLeft = timeLeft;
        this.gain = gain;
    }

    public tick() {
        this.timeLeft -= 1;
        if (this.timeLeft <= 0) {
            this.gainItem();
        }
    }

    public gainItem() {
        //    Override
    }

    // Knockout getters/setters
    get timeLeft(): number {
        return this._timeLeft();
    }

    set timeLeft(value) {
        this._timeLeft(value);
    }


}