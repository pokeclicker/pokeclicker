import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';
import BerryType from '../enums/BerryType';

export default class SpecificBerryRequirement extends AchievementRequirement {
    constructor(public berry: BerryType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
    }

    public getProgress() {
        return App.game.farming.unlockedBerries[this.berry]() ? 1 : 0;
    }

    public hint(): string {
        return `The ${this.berry} Berry must have been unlocked.`;
    }
}
