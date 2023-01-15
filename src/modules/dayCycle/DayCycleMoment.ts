import DayCyclePart from './DayCyclePart';

export default class DayCycleMoment {
    constructor(
        public type: DayCyclePart,
        public color: string,
        public description: string,
    ) { }

    get tooltip(): string {
        const tooltip = [];
        tooltip.push(this.description);
        return tooltip.join('<br>');
    }
}
