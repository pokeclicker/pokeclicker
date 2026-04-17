import ContestRunner from '../contest/ContestRunner';
import ContestType from '../enums/ContestType';
import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class InContestTypeRequirement extends Requirement {
    constructor(public contestType: ContestType, public availableInBalancedType = true, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        if (this.availableInBalancedType && this.contestType != ContestType.Balanced) {
            return Number(ContestRunner?.type() === this.contestType) || Number(ContestRunner?.type() === ContestType.Balanced);
        }
        return Number(ContestRunner?.type() === this.contestType);
    }

    public hint(): string {
        if (this.availableInBalancedType && this.contestType != ContestType.Balanced) {
            return `You must be in a ${ContestType[this.contestType]} or Balanced contest.`;
        }
        return `You must be in a ${ContestType[this.contestType]} contest.`;
    }
}
