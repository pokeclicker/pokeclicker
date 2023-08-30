import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';
import MultiRequirement from './MultiRequirement';
import Requirement from './Requirement';

export default class DevelopmentRequirement extends AchievementRequirement {
    development = false;

    constructor(public requirement : Requirement | MultiRequirement = null) {
        super(1, GameConstants.AchievementOption.more);
        // This was done like this so es/tslint doesn't throw errors
        try {
            this.development = !!JSON.parse('$DEVELOPMENT');
        // eslint-disable-next-line no-empty
        } catch (e) {}
    }

    // eslint-disable-next-line class-methods-use-this
    public getProgress() {
        return +(this.development && (this.requirement?.isCompleted() ?? true));
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return !this.development ? 'This is probably still under development.' : this.requirement?.hint() ?? 'This is probably still under development.';
    }
}
