class GymClearReward {
    constructor(
        public clearNumber: number,
        public rewardFunction: (gym: Gym) => void
    ) {}

    public isRewardClear(clear: number): boolean {
        return this.clearNumber === clear;
    }
}

class RepeatingGymClearReward extends GymClearReward {
    constructor(
        startClearNumber: number,
        private repeatPattern: number,
        private repeatUntilClear: number,
        rewardFunction: (gym: Gym) => void
    ) {
        super(startClearNumber, rewardFunction);
    }

    public isRewardClear(clear: number): boolean {
        if (clear < this.clearNumber || (this.repeatUntilClear > 0 && clear > this.repeatUntilClear)) {
            return false;
        }

        return clear === this.clearNumber || (clear - this.clearNumber) % this.repeatPattern === 0;
    }
}
