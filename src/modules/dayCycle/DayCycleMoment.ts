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
        const tooltip = [];

        const dayCycleStartHours = Object.entries(DayCycleStartHours);
        dayCycleStartHours.forEach(([dayCyclePart, startHour], index) => {
            const [, endHour] = dayCycleStartHours[index + 1] || dayCycleStartHours[0];

            if (DayCyclePart[dayCyclePart] === DayCyclePart[this.part]) {
                tooltip.push(`<span class="text-success"><b>${DayCyclePart[dayCyclePart]}: ${GameHelper.twoDigitNumber(startHour)}:00 - ${GameHelper.twoDigitNumber(endHour)}:00</b></span>`);
            } else {
                tooltip.push(`${DayCyclePart[dayCyclePart]}: ${GameHelper.twoDigitNumber(startHour)}:00 - ${GameHelper.twoDigitNumber(endHour)}:00`);
            }
        });

        return tooltip.join('<br>');
    }
}
