import { AchievementOption } from '../GameConstants';
import GameHelper from '../GameHelper';
import Requirement from './Requirement';

export default class TimeRequirement extends Requirement {
    private updateTrigger = ko.observable(0);
    constructor(public startHour: number, public endHour: number, option = AchievementOption.more) {
        super(1, option);
        setInterval(
            () => GameHelper.incrementObservable(this.updateTrigger),
            60 * 1000,
        );
    }

    public getProgress() {
        this.updateTrigger();

        const [startHour, endHour] = [this.startHour, this.endHour];
        const currentHour = new Date().getHours();

        const satisfied = startHour < endHour
            // If the start time is before the end time, both need to be true
            ? currentHour >= startHour && currentHour < endHour
            // If the start time is after the end time, only 1 needs to be true
            : currentHour >= startHour || currentHour < endHour;

        return Number(satisfied);
    }

    public hint(): string {
        return `Your local time must be between ${this.startHour}:00 and ${this.endHour}:00`;
    }
}
