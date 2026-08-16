import { AchievementOption, VeteranUnlock } from '../GameConstants';
import Requirement from './Requirement';

export default class VeteranUnlockRequirement extends Requirement {
    constructor(
        private unlock: VeteranUnlock,
    ) {
        super(1, AchievementOption.more);
    }

    public getProgress() {
        return VeteranShop.isUnlockAvailable(this.unlock) ? 1 : 0;
    }

    public hint(): string {
        return 'You are not worthy.';
    }
}
