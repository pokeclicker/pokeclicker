import { Observable, ObservableArray } from 'knockout';
import RegionalForecast from './RegionalForecast';
import Weather from './Weather';
import WeatherForecast from './WeatherForecast';
import GameHelper from '../GameHelper';
import { Region, getDungeonIndex } from '../GameConstants';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';

export default class WeatherApp {
    saveKey = 'weatherapp';
    defaults: Record<string, any>;
    
    public static fullForecast: ObservableArray<RegionalForecast> = ko.observableArray([]);
    public static selectedRegion: Observable<Region> = ko.observable(Region.hoenn);
    public static dateList: ObservableArray<Date> = ko.observableArray([]);

    public static defaultDateRange: number = 7;

    /**
     * Generates the forecasts for all regions
     */
    public static generateAllRegionsForecast() {
        GameHelper.enumNumbers(Region).forEach((r: Region) => {
            WeatherApp.generateRegionalForecast(r);
        });
    }

    /**
     * Generates the forecast for a single region
     * @param region 
     * @param dateRange 
     * @param date 
     */
    public static generateRegionalForecast(region: Region, dateRange: number = WeatherApp.defaultDateRange, date: Date = new Date()) {
        const weatherForecastList = [];
        // Creates forecasts for X hour
        for (let hour = 0; hour <= 23; hour += Weather.period) {
            const hourForecast = [];
            const newDate = new Date(date.setHours(hour, 0, 0, 0));
            // Gets the weather for every day for that hour
            for (let i = 0; i < dateRange; i++) {
                const weatherForecastDate = new Date(newDate);
                const weatherForecast = new WeatherForecast(weatherForecastDate, Weather.getWeather(region, newDate));
                hourForecast.push(weatherForecast);
                newDate.setDate(newDate.getDate() + 1);
            }
            weatherForecastList.push(hourForecast);
        }
        WeatherApp.addRegionalForecast(new RegionalForecast(region, weatherForecastList));
    }

    /**
     * Generate the date list for the table
     * @param dateRange 
     * @param date 
     */
    public static generateDateList(dateRange: number = WeatherApp.defaultDateRange, date: Date = new Date()) {
        WeatherApp.dateList([]);
        const newDate = new Date(date.setHours(0, 0, 0, 0));
        const dateList = [];
        for (let i = 0; i < dateRange; i++) {
            dateList.push(new Date(newDate));
            newDate.setDate(newDate.getDate() + 1);
        }
        WeatherApp.dateList(dateList);
    }

    /**
     * Generate the hour list for the table
     * @returns number[]
     */
    public static generateHourList() {
        const hourList = [];
        for (let i = 0; i <= 23; i++) {
            if (i % Weather.period === 0) {
                hourList.push(i);
            }
        }
        return hourList;
    }

    /**
     * Adds the regional forecast to the forecast list
     * @param regionalForecast 
     */
    public static addRegionalForecast(regionalForecast: RegionalForecast) {
        let exist = false;
        WeatherApp.fullForecast().map((rf) => {
            if (rf.region === regionalForecast.region) {
                rf.weatherForecastList([]);
                rf.weatherForecastList(regionalForecast.weatherForecastList());
                exist = true;
            }
        });
        if (!exist) {
            WeatherApp.fullForecast().push(regionalForecast);
        }
    }

    /**
     * Checks if the date in the weather forecast has already passed and set the status if it does
     */
    public static checkDateHasPassed() {
        const now = new Date();
        WeatherApp.fullForecast().forEach((rf) => {
            // Full forecast
            // Set status to hasPassed if weather end date has passed already
            rf.weatherForecastList().flat().map((wf) => {
                const weatherEndDate = new Date(new Date(wf.date).setHours(wf.date.getHours() + Weather.period, 0, 0, 0));
                if (now > weatherEndDate) {
                    wf.setStatusHasPassed();
                }
            });
        });
    }

    /**
     * Functions to initialize on load
     */
    public static initialize() {
        WeatherApp.generateAllRegionsForecast();
        WeatherApp.generateDateList();
        WeatherApp.checkDateHasPassed();
    }

    /**
     * Checks if the Weather App is unlocked
     * @returns boolean
     */
    public static isUnlocked() {
        return App.game.statistics.dungeonsCleared[getDungeonIndex('Weather Institute')]() > 0;
    }

    /**
     * Opens the Weather App modal.
     */
    public static openWeatherAppModal() {
        if (WeatherApp.isUnlocked()) {
            $('#weatherAppModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You need to clear Weather Institute first to unlock this feature.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    // Save stuff
    fromJSON(json): void {
        if (json == null) {
            return;
        }

        WeatherApp.selectedRegion(json.selectedRegion);
    }

    toJSON() {
        return {
            selectedRegion: WeatherApp.selectedRegion(),
        };
    }
}
