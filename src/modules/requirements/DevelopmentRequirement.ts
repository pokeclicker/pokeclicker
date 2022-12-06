import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class DevelopmentRequirement extends AchievementRequirement {
    development = false;

    constructor() {
        super(1, GameConstants.AchievementOption.more);
        // This was done like this so es/tslint doesn't throw errors
        try {
            this.development = !!JSON.parse('$DEVELOPMENT');
        // eslint-disable-next-line no-empty
        } catch (e) {}
    }

    // eslint-disable-next-line class-methods-use-this
    public getProgress() {
        return +this.development;
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'This is probably still under development.';
    }
}
