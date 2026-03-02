import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';
import BerryType from '../enums/BerryType';

export default class SpecificBerryUnlockedRequirement extends AchievementRequirement {
    constructor(public berry: BerryType, public unlocked = 1) {
        super(1, unlocked ? GameConstants.AchievementOption.more : GameConstants.AchievementOption.less);
    }

    public getProgress() {
        return App.game.farming.unlockedBerries[this.berry]() ? 0 ^ this.unlocked : 1 ^ this.unlocked;
        //
    }

    public hint(): string {
        return this.unlocked ? `The ${this.berry} Berry must have been unlocked.` : `The ${this.berry} Berry must be locked`;
    }
}
