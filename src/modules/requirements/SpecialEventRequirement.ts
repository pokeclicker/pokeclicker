import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class SpecialEventRequirement extends Requirement {
    specialEvent: any;

    constructor(specialEvent: GameConstants.SpecialEvents, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.specialEvent = App.game.specialEvents.events[specialEvent];
    }

    public getProgress(): number {
        return +(this.specialEvent.isActive());
    }

    public hint(): string {
        return `${this.specialEvent.title} is not active.`;
    }
}
