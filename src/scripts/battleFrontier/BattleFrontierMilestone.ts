class BattleFrontierMilestone {
    constructor (
        public stage: number,
        public description: string,
        public rewardFunction: () => void,
        public image: string = null
    ) {}

    gain () {
        this.rewardFunction();
    }
}
