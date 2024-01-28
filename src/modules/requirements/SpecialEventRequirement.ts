import { AchievementOption } from '../GameConstants';
import { SpecialEventTitleType } from '../specialEvents/SpecialEventTitleType';

import Requirement from './Requirement';

export default class SpecialEventRequirement extends Requirement {
    constructor(private specialEventName: SpecialEventTitleType) {
        super(1, AchievementOption.equal);
    }

    public getProgress(): number {
        return +(App.game.specialEvents.getEvent(this.specialEventName).isActive());
    }

    public hint(): string {
        return `Event ${this.specialEventName} has not started.`;
    }
}
