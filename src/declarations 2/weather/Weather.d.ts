/// <reference path="knockout.d.ts"/>
/// <reference path="./WeatherType.d.ts"/>
/// <reference path="./WeatherCondition.d.ts"/>
/// <reference path="../GameConstants.d.ts"/>
declare class Weather {
    static regionalWeather: Observable<WeatherType>[];
    static currentWeather: Computed<WeatherType>;
    static image: Computed<string>;
    static color: Computed<string>;
    static tooltip: Computed<string>;
    static weatherConditions: {
        [weather in WeatherType]?: WeatherCondition;
    };
    /**
     * The probability distribution for Weather conditions
     */
    static weatherDistribution: {
        [region in Region]?: WeatherType[];
    };
    /**
     * The period for Weather changes (in hours)
     */
    static period: number;
    /**
     * Generates the current Weather condition
     * @param date The current date
     */
    static generateWeather(date: Date): void;
}
