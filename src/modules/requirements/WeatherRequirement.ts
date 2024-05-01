import { AchievementOption, humanifyString } from '../GameConstants';
import Weather from '../weather/Weather';
import WeatherType from '../weather/WeatherType';
import Requirement from './Requirement';

export default class WeatherRequirement extends Requirement {
    private weather: WeatherType[];

    constructor(weather: WeatherType[], option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.weather = weather;
    }

    public getProgress(): number {
        return +this.weather.includes(Weather.currentWeather());
    }

    public hint(): string {
        return `The weather needs to be ${this.weather.map((weather) => humanifyString(WeatherType[weather])).join(' or ')}`;
    }
}
