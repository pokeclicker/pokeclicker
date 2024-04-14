/**
 * Contest class
 */
class Contest {
    public onclick(): void {
        ContestRunner.startContest(this);
    }

    constructor(
        public rank: ContestRank,
        public contestType: ContestType,
    ) {
    }
}
