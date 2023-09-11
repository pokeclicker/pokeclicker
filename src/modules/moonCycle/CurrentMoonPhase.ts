import MoonCyclePhase from './MoonCyclePhase';

export default class CurrentMoonPhase {
    constructor(
        public phase: MoonCyclePhase,
        public color: string,
        public description: string,
    ) { }


    get tooltip(): string {
        const tooltip = [];
        tooltip.push(this.description);
        return tooltip.join('<br>');
    }
}

