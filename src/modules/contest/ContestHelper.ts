import ContestRank from '../enums/ContestRank';

export default class ContestHelper {
    // Rank Mechanics
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static rankAppeal: Record<ContestRank, number> = {
        [ContestRank.Practice]: 0,
        [ContestRank.Normal]: 800,
        [ContestRank.Super]: 2300,
        [ContestRank.Hyper]: 3800,
        [ContestRank.Master]: 6000,
        [ContestRank['Super Normal']]: 6800,
        [ContestRank['Super Great']]: 8300,
        [ContestRank['Super Ultra']]: 9800,
        [ContestRank['Super Master']]: 12000,
        [ContestRank.Spectacular]: 14200,
        [ContestRank['Brilliant Shining']]: 16400,
    };

    public static contestRankTimer(rank: ContestRank): number {
        switch (rank) {
            case ContestRank.Normal:
                return 1.5;
            case ContestRank.Super:
                return 2;
            case ContestRank.Hyper:
                return 2.5;
            case ContestRank.Master:
                return 3;
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                // return 6;
            case ContestRank.Spectacular:
            case ContestRank['Brilliant Shining']:
                // return 9;
                return 3;
        }
    }

    public static getBaseAudienceHP(rank: ContestRank) {
        return ContestHelper.rankAppeal[rank] * 80 * rank * rank * ContestHelper.contestRankTimer(rank);
    }
}
