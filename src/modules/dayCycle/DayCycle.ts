/* eslint-disable arrow-body-style */
import { Computed } from 'knockout';
import DayCycleMoment from './DayCycleMoment';
import DayCyclePart from './DayCyclePart';
import { DayCycleStartHours } from '../GameConstants';
import GameHelper from '../GameHelper';

export default class DayCycle {
    public static currentDayCyclePart: Computed<DayCyclePart> = ko.pureComputed(() => {
        const currentHour = GameHelper.currentTime().getHours();

        return Number(Object.entries(DayCycleStartHours).reverse().find(([, startHour]) => startHour <= currentHour)?.[0] ?? Object.keys(DayCycleStartHours).slice(-1));
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

    public static dayCycleMoments: Record<DayCyclePart, DayCycleMoment> = {
        [DayCyclePart.Dawn]:
            new DayCycleMoment(DayCyclePart.Dawn, '#25b6a0', 'Dawn'),
        [DayCyclePart.Day]:
            new DayCycleMoment(DayCyclePart.Day, '#f4a470', 'Day'),
        [DayCyclePart.Dusk]:
            new DayCycleMoment(DayCyclePart.Dusk, '#93558a', 'Dusk'),
        [DayCyclePart.Night]:
            new DayCycleMoment(DayCyclePart.Night, '#4a6252', 'Night'),
    };
}
