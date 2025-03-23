import BerryType from '../enums/BerryType';
import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class BerryUnlockedRequirement extends AchievementRequirement {
    constructor(berry: BerryType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(berry, option);
    }

    public getProgress() {
        return Number(App.game.farming.unlockedBerries[this.requiredValue]());
    }

    public hint(): string {
        return `The ${BerryType[this.requiredValue]} Berry needs to be unlocked.`;
    }
}
