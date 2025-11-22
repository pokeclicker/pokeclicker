import ContestRank from '../enums/ContestRank';
import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';
import ContestItemReward from './ContestItemReward';

export default interface ContestTrainerOptions {
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    rankedBerryReward?: { rank: ContestRank, amount: number },
    itemReward?: ContestItemReward[],
}
