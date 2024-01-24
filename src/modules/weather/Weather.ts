/* eslint-disable arrow-body-style */
import { Observable, Computed } from 'knockout';
import WeatherType from './WeatherType';
import WeatherCondition from './WeatherCondition';
import GameHelper from '../GameHelper';
import { Region } from '../GameConstants';
import PokemonType from '../enums/PokemonType';
import SeededRand from '../utilities/SeededRand';

export default class Weather {
    public static regionalWeather: Observable<WeatherType>[] = Array<WeatherType>(GameHelper.enumLength(Region)).fill(WeatherType.Clear).map((v) => ko.observable<WeatherType>(v));

    public static currentWeather: Computed<WeatherType> = ko.pureComputed(() => {
        const weather = Weather.regionalWeather[player.region]();

        // TODO: HLXII - Add weather overrides

        return weather;
    });

    public static image: Computed<string> = ko.pureComputed(() => {
        return `assets/images/weather/${WeatherType[Weather.currentWeather()]}.png`;
    });

    public static color: Computed<string> = ko.pureComputed(() => {
        return Weather.weatherConditions[Weather.currentWeather()].color;
    });

    public static tooltip: Computed<string> = ko.pureComputed(() => {
        return Weather.weatherConditions[Weather.currentWeather()].tooltip;
    });

    public static weatherConditions: { [weather in WeatherType]?: WeatherCondition } = {
        [WeatherType.Clear]:
            new WeatherCondition(WeatherType.Clear, '#ffe57a', 'The weather is clear and pleasant.', 30),
        [WeatherType.Overcast]:
            new WeatherCondition(WeatherType.Overcast, '#a7db8d', 'Clouds fill the skies.', 15,
                [{ type: PokemonType.Normal, multiplier: 1.1 }, { type: PokemonType.Fighting, multiplier: 1.1 }, { type: PokemonType.Poison, multiplier: 1.1 }]),
        [WeatherType.Rain]:
            new WeatherCondition(WeatherType.Rain, '#9db7f5', 'It\'s rainy and humid.', 10,
                [{ type: PokemonType.Water, multiplier: 1.1 }, { type: PokemonType.Bug, multiplier: 1.1 }]),
        [WeatherType.Thunderstorm]:
            new WeatherCondition(WeatherType.Thunderstorm, '#a19288', 'It\'s currently raining heavily with thunder.', 10,
                [{ type: PokemonType.Electric, multiplier: 1.1 }, { type: PokemonType.Water, multiplier: 1.1 }, { type: PokemonType.Fire, multiplier: 0.9 }]),
        [WeatherType.Snow]:
            new WeatherCondition(WeatherType.Snow, '#bbe6e6', 'It\'s cold and snowing.', 5,
                [{ type: PokemonType.Fairy, multiplier: 1.1 }, { type: PokemonType.Ice, multiplier: 1.05 }]),
        [WeatherType.Hail]:
            new WeatherCondition(WeatherType.Hail, '#74e6e6', 'It\'s cold and hailing.', 2,
                [{ type: PokemonType.Ice, multiplier: 1.1 }]),
        [WeatherType.Blizzard]:
            new WeatherCondition(WeatherType.Blizzard, '#98d8d8', 'A howling blizzard blows.', 5,
                [{ type: PokemonType.Ice, multiplier: 1.2 }, { type: PokemonType.Steel, multiplier: 1.1 }, { type: PokemonType.Fire, multiplier: 0.9 }, { type: PokemonType.Grass, multiplier: 0.9 }]),
        [WeatherType.Harsh_Sunlight]:
            new WeatherCondition(WeatherType.Harsh_Sunlight, '#f5ac78', 'The sunlight is strong.', 10,
                [{ type: PokemonType.Fire, multiplier: 1.2 }, { type: PokemonType.Grass, multiplier: 1.1 }, { type: PokemonType.Water, multiplier: 0.9 }]),
        [WeatherType.Sandstorm]:
            new WeatherCondition(WeatherType.Sandstorm, '#d1c07d', 'A sandstorm is raging.', 10,
                [{ type: PokemonType.Rock, multiplier: 1.1 }, { type: PokemonType.Ground, multiplier: 1.1 }]),
        [WeatherType.Fog]:
            new WeatherCondition(WeatherType.Fog, '#d2c2ef', 'The fog is deep...', 10,
                [
                    { type: PokemonType.Ghost, multiplier: 1.2 },
                    { type: PokemonType.Psychic, multiplier: 1.1 },
                    { type: PokemonType.Dark, multiplier: 1.1 },
                    { type: PokemonType.Electric, multiplier: 0.9 },
                ]),
        [WeatherType.Windy]:
            new WeatherCondition(WeatherType.Windy, '#81c4ca', 'Mysterious strong winds blow.', 3,
                [{ type: PokemonType.Flying, multiplier: 1.2 }, { type: PokemonType.Dragon, multiplier: 1.1 }]),
    };

    /**
     * The probability distribution for Weather conditions
     */
    public static weatherDistribution: { [region in Region]?: WeatherType[] } = {
        [Region.kanto]: [
            WeatherType.Clear,
            WeatherType.Overcast,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Harsh_Sunlight,
        ],
        [Region.johto]: [
            WeatherType.Clear,
            WeatherType.Overcast,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Snow,
            WeatherType.Hail,
            WeatherType.Blizzard,
            WeatherType.Harsh_Sunlight,
        ],
        [Region.hoenn]: [
            WeatherType.Clear,
            WeatherType.Overcast,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Snow,
            WeatherType.Hail,
            WeatherType.Blizzard,
            WeatherType.Harsh_Sunlight,
            WeatherType.Sandstorm,
        ],
        [Region.sinnoh]: [
            WeatherType.Clear,
            WeatherType.Overcast,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Snow,
            WeatherType.Hail,
            WeatherType.Blizzard,
            WeatherType.Harsh_Sunlight,
            WeatherType.Sandstorm,
            WeatherType.Fog,
        ],
    };

    /**
     * The period for Weather changes (in hours)
     */
    public static period = 4;

    /**
     * Generates the current Weather condition
     * @param date The current date
     */
    public static generateWeather(date: Date): void {
        SeededRand.seedWithDateHour(date, this.period);

        Weather.regionalWeather.forEach((weather: Observable<WeatherType>, region: Region) => {
            // If no distribution set, assume all weather available
            const dist = Weather.weatherDistribution[region] || GameHelper.enumNumbers(WeatherType);

            // Select weather based on weighted odds
            const selectedWeather = SeededRand.fromWeightedArray(dist, dist.map((w) => Weather.weatherConditions[w].weight));

            // Set selected weather or Clear if failed
            weather(selectedWeather || WeatherType.Clear);
        });
    }

    /**
     * Gets the weather for a region at a certain date
     * @param date
     * @param region
     * @returns WeatherType
     */
    public static getWeather(region: Region, date: Date = new Date()): WeatherType {
        SeededRand.seedWithDateHour(date, Weather.period);

        for (let i = 0; i < region; i++) {
            SeededRand.next();
        }

        // If no distribution set, assume all weather available
        const dist = Weather.weatherDistribution[region] || GameHelper.enumNumbers(WeatherType);

        // Select weather based on weighted odds
        const selectedWeather = SeededRand.fromWeightedArray(dist, dist.map((w) => Weather.weatherConditions[w].weight));

        return selectedWeather;
    }
}
