import ContestRank from '../enums/ContestRank';
import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class InContestRankRequirement extends Requirement {
    constructor(public contestRank: ContestRank, option = AchievementOption.more) {
        super(contestRank, option);
    }

    public getProgress() {
        return Number(ContestRunner?.rank() ?? 0);
    }

    public hint(): string {
        switch (this.option) {
            case AchievementOption.less:
                return `You must be in a contest Rank lower than ${ContestRank[this.contestRank]}.`;
            case AchievementOption.equal:
                return `You must be in a ${ContestRank[this.contestRank]} Rank contest.`;
            case AchievementOption.more:
            default:
                return `You must be in a ${ContestRank[this.contestRank]} Rank or higher contest.`;
        }
    }
}
