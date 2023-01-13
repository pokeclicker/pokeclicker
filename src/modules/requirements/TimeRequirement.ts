import { AchievementOption } from '../GameConstants';
import GameHelper from '../GameHelper';
import Requirement from './Requirement';
import DayCyclePart from '../dayCycle/DayCyclePart';
import DayCycle from '../dayCycle/DayCycle';

export default class TimeRequirement extends Requirement {
    private updateTrigger = ko.observable(0);
    constructor(public dayCyclePart: DayCyclePart, public strictDayCycleParts: boolean = false, option = AchievementOption.more) {
        super(1, option);
        setInterval(
            () => GameHelper.incrementObservable(this.updateTrigger),
            60 * 1000,
        );
    }

    public getProgress() {
        this.updateTrigger();

        if (!this.strictDayCycleParts && this.dayCyclePart === DayCyclePart.Day) {
            return Number([DayCyclePart.Dawn, DayCyclePart.Day, DayCyclePart.Dusk].includes(DayCycle.currentDayCyclePart()));
        }

        return Number(this.dayCyclePart === DayCycle.currentDayCyclePart());
    }

    public hint(): string {
        return `Your local part of the day must be ${DayCycle.dayCycleMoments[this.dayCyclePart].tooltip}`;
    }
}
