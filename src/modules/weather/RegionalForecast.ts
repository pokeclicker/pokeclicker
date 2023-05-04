import WeatherForecast from './WeatherForecast';
import { Region } from '../GameConstants';
import { ObservableArray } from 'knockout';


export default class RegionalForecast {
    public region: Region;
    public weatherForecastList: ObservableArray<Array<WeatherForecast>>;

    constructor(
        region: Region,
        weatherForecastList: Array<Array<WeatherForecast>> = [],
    ) {
        this.region = region;
        this.weatherForecastList = ko.observableArray(weatherForecastList);
    }
}
