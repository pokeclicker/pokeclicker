class BattleFrontierMilestone {
    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public _image?: string,
        private _description?: string
    ) {}

    gain () {
        this.rewardFunction();
    }

    get image() {
        return this._image;
    }

    get description() {
        return this._description;
    }
}
