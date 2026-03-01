import BerryType from '../enums/BerryType';
import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class BerryUnlockedRequirement extends AchievementRequirement {
    constructor(public berry: BerryType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(App.game.farming.unlockedBerries[this.berry]());
    }

    public hint(): string {
        return `The ${BerryType[this.berry]} Berry needs to be unlocked.`;
    }
}
