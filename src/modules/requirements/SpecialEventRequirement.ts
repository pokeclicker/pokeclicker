import { AchievementOption } from '../GameConstants';
import { SpecialEventStatus } from '../specialEvents/SpecialEvent';

import Requirement from './Requirement';

export default class SpecialEventRequirement extends Requirement {
    constructor(private specialEventName: string) {
        super(1, AchievementOption.equal);
    }

    public getProgress(): number {
        return +(App.game.specialEvents.getEvent(this.specialEventName).status() == SpecialEventStatus.started);
    }

    public hint(): string {
        return `Event ${this.specialEventName} has not started.`;
    }
}
