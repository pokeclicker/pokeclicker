import WeatherType from './DayCyclePart';

export default class DayCycleMoment {
    constructor(
        public type: WeatherType,
        public color: string,
        public description: string,
    ) { }

    get tooltip(): string {
        const tooltip = [];
        tooltip.push(this.description);
        return tooltip.join('<br>');
    }
}
