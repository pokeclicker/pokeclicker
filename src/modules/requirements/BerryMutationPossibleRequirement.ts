import { AchievementOption } from '../GameConstants';
import BerryType from '../enums/BerryType';
import Requirement from './Requirement';

export default class BerryMutationPossibleRequirement extends Requirement {
    constructor(public berry: BerryType, public requireUnlocked = true) {
        super(1, AchievementOption.more);
    }

    public getProgress() {
        return Number(App.game.farming.isMutationPossible(this.berry, this.requireUnlocked));
    }

    public hint(): string {
        if (this.requireUnlocked) {
            return `The ${BerryType[this.berry]} Berry mutation must be unlocked, and your farm arranged so it is possible.`;
        }
        return `Your farm must be arranged so a ${BerryType[this.berry]} Berry mutation is possible.`;
    }
}
