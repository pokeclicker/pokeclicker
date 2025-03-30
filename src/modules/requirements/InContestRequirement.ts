import ContestType from '../enums/ContestType';
import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class InContestRequirement extends Requirement {
    constructor(public contestType: ContestType, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(ContestRunner?.type() === this.contestType);
    }

    public hint(): string {
        return `You must be in a ${
            ContestType[this.contestType]
        } contest`;
    }
}
