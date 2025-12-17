import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class DummyRequirement extends AchievementRequirement {
    constructor() {
        super(1, GameConstants.AchievementOption.more);
    }

    public getProgress() {
        return 0;
    }

    public hint(): string {
        return 'Dummy!';
    }
}
