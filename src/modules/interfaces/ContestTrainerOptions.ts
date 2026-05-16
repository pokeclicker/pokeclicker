import ContestRank from '../enums/ContestRank';
import Requirement from '../requirements/Requirement';
import ContestItemReward from './ContestItemReward';

export default interface ContestTrainerOptions {
    requirement?: Requirement,
    rankedBerryReward?: { rank: ContestRank, amount: number },
    itemReward?: ContestItemReward[],
}
