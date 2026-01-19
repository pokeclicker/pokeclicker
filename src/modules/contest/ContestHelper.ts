import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import { Region } from '../GameConstants';
import ContestWonRequirement from '../requirements/ContestWonRequirement';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';

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

    // Requirements
    public static contestIsUnlocked(rank: ContestRank, type: ContestType) {
        return ContestHelper.getContestHallRequirements(rank, type).every(r => r.isCompleted());
    }

    public static getContestHallRequirements(rank: ContestRank, type?: ContestType): (Requirement | OneFromManyRequirement)[] {
        if (new DevelopmentRequirement().isCompleted()) {
            return [new DevelopmentRequirement()];
        }
        if (rank <= ContestRank.Normal) {
            return [new MaxRegionRequirement(Region.hoenn)];
        }
        return [new ContestWonRequirement(1, rank - 1, type)];
    }

    // HTML
    // Info modal
    public static getRankInfo(rank: ContestRank) {
        switch (rank) {
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                return 'Hoenn';
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                // return 'Sinnoh';
            case ContestRank.Spectacular:
                // return 'Spectacular';
            case ContestRank['Brilliant Shining']:
                // return 'BrilliantShining';
                return 'Hoenn';
        }
    }
}
