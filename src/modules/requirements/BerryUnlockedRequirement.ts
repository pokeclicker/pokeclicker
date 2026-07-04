import { AchievementOption } from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';
import BerryType from '../enums/BerryType';

export default class BerryUnlockedRequirement extends AchievementRequirement {
    constructor(public berry: BerryType, unlocked = true) {
        super(1, unlocked ? AchievementOption.more : AchievementOption.less);
    }

    public getProgress() {
        return Number(App.game.farming.unlockedBerries[this.berry]());
    }

    public hint(): string {
        return `The ${BerryType[this.berry]} Berry must be ${this.option == AchievementOption.more ? 'un' : ''}locked.`;
    }
}
