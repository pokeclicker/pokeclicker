class BattleFrontierMilestone {
    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public image: string = null,
        private _description?: string
    ) {}

    gain () {
        this.rewardFunction();
    }

    get description() {
        return this._description;
    }
}
