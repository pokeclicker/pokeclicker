import * as GameConstants from '../GameConstants';
import FluteEffectRunner from '../gems/FluteEffectRunner';
import AchievementRequirement from './AchievementRequirement';

export default class AllFlutesTimeActiveRequirement extends AchievementRequirement {
    private static lowestTimeActive = ko.pureComputed((): number => {
        return Math.min(...Object.values(FluteEffectRunner.fluteActiveTime).map((time) => time()));
    }).extend({ rateLimit: 1000 });

    constructor(
        requiredMinutes: number,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more,
    ) {
        super(requiredMinutes, option);
    }

    public getProgress() {
        return Math.min(Math.floor(AllFlutesTimeActiveRequirement.lowestTimeActive() / 60), this.requiredValue);
    }

    public hint(): string {
        return `Have all Flutes active for a total of ${this.requiredValue.toLocaleString('en-US')} minutes.`;
    }
}
