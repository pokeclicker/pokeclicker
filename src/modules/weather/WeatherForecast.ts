import { Observable } from 'knockout';
import WeatherForecastStatus from '../enums/WeatherForecastStatus';
import WeatherType from './WeatherType';

export default class WeatherForecast {
    public date: string;
    public weatherType: WeatherType;
    public status: Observable<WeatherForecastStatus>;

    constructor(
        date: string, // Date as toLocaleString
        weatherType: WeatherType,
        status = WeatherForecastStatus.disabled,
    ) {
        this.date = date;
        this.weatherType = weatherType;
        this.status = ko.observable(status);
    }

    setStatusHasPassed() {
        this.status(WeatherForecastStatus.hasPassed);
    }
}