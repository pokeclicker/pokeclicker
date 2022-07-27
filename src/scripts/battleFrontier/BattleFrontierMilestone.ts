class BattleFrontierMilestone {
    public obtained = ko.observable(false);

    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public _image?: string,
        private _description?: string
    ) {}

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
}
