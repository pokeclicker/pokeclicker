import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';
import GameHelper from '../GameHelper';
import MultiRequirement from './MultiRequirement';
import Requirement from './Requirement';

export default class DevelopmentRequirement extends AchievementRequirement {
    private static default: DevelopmentRequirement;
    development = false;

    constructor(public requirement : Requirement | MultiRequirement = null) {
        super(1, GameConstants.AchievementOption.more);

        if (!requirement) {
            if (DevelopmentRequirement.default) {
                return DevelopmentRequirement.default;
            }
            DevelopmentRequirement.default = this;
        }

        this.development = GameHelper.isDevelopmentBuild();
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
