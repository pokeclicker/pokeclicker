import { AchievementOption } from '../GameConstants';

import Requirement from './Requirement';

export default class SpecialEventRequirement extends Requirement {
    constructor(private specialEventName: string) {
        super(1, AchievementOption.equal);
    }

    public getProgress(): number {
        return +(App.game.specialEvents.getEvent(this.specialEventName).isActive());
    }

    public hint(): string {
        return `Event ${this.specialEventName} has not started.`;
    }
}
