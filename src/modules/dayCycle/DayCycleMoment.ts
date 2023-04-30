import DayCyclePart from './DayCyclePart';
import { DayCycleStartHours } from '../GameConstants';
import GameHelper from '../GameHelper';

export default class DayCycleMoment {
    constructor(
        public part: DayCyclePart,
        public color: string,
        public description: string,
    ) { }

    get tooltip(): string {
        const dayCycleStartHours = Object.entries(DayCycleStartHours);
        return dayCycleStartHours.map(([dayCyclePart, startHour], index) => {
            const [, endHour] = dayCycleStartHours[index + 1] || dayCycleStartHours[0];
            const content = `${DayCyclePart[dayCyclePart]}: ${GameHelper.twoDigitNumber(startHour)}:00 - ${GameHelper.twoDigitNumber(endHour)}:00`;

            return DayCyclePart[dayCyclePart] === DayCyclePart[this.part]
                ? `<span class="text-success"><b>${content}</b></span>`
                : content;
        }).join('<br>');
    }
}
