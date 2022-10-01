class BattleFrontierMilestone {
    public obtained = ko.observable(false);

    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public requirement?: Requirement,
        public _image?: string,
        private _description?: string
    ) { }

    public isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }

    gain () {
        if (!this.obtained()) {
            this.rewardFunction();
            this.obtained(true);
        }
    }

    get image() {
        return this._image;
    }

    get description() {
        return this._description;
    }

    get displayName(): string | KnockoutObservable<string> {
        return this.description;
    }
}
