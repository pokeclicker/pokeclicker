class BattleFrontierMilestone {
    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public _imagePath?: string,
        private _description?: string
    ) {}

    gain () {
        this.rewardFunction();
    }

    get imagePath() {
        return this._imagePath;
    }

    get description() {
        return this._description;
    }
}
