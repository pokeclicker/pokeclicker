import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class SpecialEventRequirement extends Requirement {
    specialEvent: GameConstants.SpecialEvents;

    constructor(specialEvent: GameConstants.SpecialEvents, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.specialEvent = specialEvent;
    }

    public getProgress(): number {
        return +(App.game.specialEvents.getEvent(this.specialEvent).isActive());
    }

    public hint(): string {
        return `${App.game.specialEvents.getEvent(this.specialEvent).title} is not active.`;
    }
}
