class BattleFrontierMilestone {
    constructor (
        public stage: number,
        public rewardFunction: () => void,
        public image: string = null
    ) {}

    gain () {
        this.rewardFunction();
    }
}
