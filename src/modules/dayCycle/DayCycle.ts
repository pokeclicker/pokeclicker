/* eslint-disable arrow-body-style */
import { Computed } from 'knockout';
import DayCycleMoment from './DayCycleMoment';
import DayCyclePart from './DayCyclePart';

export default class DayCycle {
    public static currentDayCyclePart: Computed<DayCyclePart> = ko.pureComputed(() => {
        const curHour = (new Date()).getHours();
        let dayCyclePart: DayCyclePart;

        if (curHour === 17) {
            dayCyclePart = DayCyclePart.Dusk;
        } else if (curHour === 6) {
            dayCyclePart = DayCyclePart.Dawn;
        } else if (curHour > 6 && curHour < 17) {
            dayCyclePart = DayCyclePart.Day;
        } else {
            dayCyclePart = DayCyclePart.Night;
        }

        return dayCyclePart;
    });

    public static image: Computed<string> = ko.pureComputed(() => {
        return `assets/images/dayCycle/${DayCyclePart[DayCycle.currentDayCyclePart()]}.png`;
    });

    public static color: Computed<string> = ko.pureComputed(() => {
        return DayCycle.dayCycleMoments[DayCycle.currentDayCyclePart()].color;
    });

    public static tooltip: Computed<string> = ko.pureComputed(() => {
        return DayCycle.dayCycleMoments[DayCycle.currentDayCyclePart()].tooltip;
    });

    public static dayCycleMoments: { [dayCycle in DayCyclePart]?: DayCycleMoment } = {
        [DayCyclePart.Day]:
            new DayCycleMoment(DayCyclePart.Day, '#f4a470', 'Day'),
        [DayCyclePart.Dusk]:
            new DayCycleMoment(DayCyclePart.Dusk, '#93558a', 'Dusk'),
        [DayCyclePart.Dawn]:
            new DayCycleMoment(DayCyclePart.Dawn, '#25b6a0', 'Dawn'),
        [DayCyclePart.Night]:
            new DayCycleMoment(DayCyclePart.Night, '#4a6252', 'Night'),
    };
}
