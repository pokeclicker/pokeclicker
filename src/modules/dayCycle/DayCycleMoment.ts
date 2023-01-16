import DayCyclePart from './DayCyclePart';

export default class DayCycleMoment {
    constructor(
        public type: DayCyclePart,
        public color: string,
        public description: string,
    ) { }

    get tooltip(): string {
        const tooltip = [];
        const dayCycleSchedule: Array<string> = [
            'Dawn : 06:00 - 07:00',
            'Day: 07:00 - 17:00',
            'Dusk: 17:00 - 18:00',
            'Night: 18:00 - 06:00',
        ];

        dayCycleSchedule.forEach((schedule, dayCyclePart) => {
            if (dayCyclePart === this.type) {
                tooltip[dayCyclePart] = (`<b>${schedule}</b>`);
            } else {
                tooltip[dayCyclePart] = schedule;
            }
        });

        return tooltip.join('<br>');
    }
}
