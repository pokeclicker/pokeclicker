import WeatherType from './WeatherType';
import PokemonType from '../enums/PokemonType';

export default class WeatherCondition {
    constructor(
        public type: WeatherType,
        public color: string,
        public description: string,
        public weight: number,
        public multipliers: { type: PokemonType, multiplier: number }[] = [],
    ) { }

    get tooltip(): string {
        const tooltip = [];
        tooltip.push(this.description);
        this.multipliers.forEach((v) => {
            tooltip.push(`${PokemonType[v.type]}: ${v.multiplier.toFixed(2)}x`);
        });
        return tooltip.join('<br>');
    }
}
