import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';
import BerryType from '../enums/BerryType';

export default class SpecificBerryUnlockedRequirement extends AchievementRequirement {
    constructor(public berry: BerryType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(App.game.farming.unlockedBerries[this.berry]());
    }

    public hint(): string {
        return `The ${BerryType[this.berry]} Berry must be ${this.option >= GameConstants.AchievementOption.equal ? 'un' : ''}locked.`;
    }
}
