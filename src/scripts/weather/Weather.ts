/// <reference path="./WeatherType.ts" />
/// <reference path="./WeatherCondition.ts" />

type WeatherDistribution = { [weather in WeatherType]?: number };

class Weather {

    public static weather: KnockoutObservable<WeatherType>[] = Array<WeatherType>(GameHelper.enumLength(GameConstants.Region)).fill(WeatherType.Clear).map(v => ko.observable<WeatherType>(v));

    public static currentWeather: KnockoutComputed<WeatherType> = ko.pureComputed(() => {

        const weather = Weather.weather[player.region]();

        // TODO: HLXII - Add weather overrides

        return weather;
    });

    public static image: KnockoutComputed<string> = ko.pureComputed(() => {
        return `assets/images/weather/${WeatherType[Weather.currentWeather()]}.png`;
    });

    public static color: KnockoutComputed<string> = ko.pureComputed(() => {
        return Weather.weatherConditions[Weather.currentWeather()].color;
    });

    public static tooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        return Weather.weatherConditions[Weather.currentWeather()].tooltip;
    });

    public static weatherConditions: { [weather in WeatherType]?: WeatherCondition } = {
        [WeatherType.Clear]:            new WeatherCondition(WeatherType.Clear, '#ffe57a', 'The weather is clear and pleasant.', 30),
        [WeatherType.Cloudy]:           new WeatherCondition(WeatherType.Cloudy, '#bed8ff', 'Clouds fill the skies.', 20),
        [WeatherType.Rain]:             new WeatherCondition(WeatherType.Rain, '#9db7f5', 'It\'s rainy and humid.', 10,
            [{type: PokemonType.Water, multiplier: 1.1}]),
        [WeatherType.Thunderstorm]:     new WeatherCondition(WeatherType.Thunderstorm, '#a19288', 'It\'s currently raining heavily with thunder.', 5,
            [{type: PokemonType.Electric, multiplier: 1.1}, {type: PokemonType.Water, multiplier: 1.1}]),
        [WeatherType.Snow]:             new WeatherCondition(WeatherType.Snow, '#bbe6e6', 'It\'s cold and snowing.', 5,
            [{type: PokemonType.Ice, multiplier: 1.05}]),
        [WeatherType.Hail]:             new WeatherCondition(WeatherType.Hail, '#74e6e6', 'It\'s cold and hailing.', 3,
            [{type: PokemonType.Ice, multiplier: 1.1}]),
        [WeatherType.Blizzard]:         new WeatherCondition(WeatherType.Blizzard, '#98d8d8', 'A howling blizzard blows.', 2,
            [{type: PokemonType.Ice, multiplier: 1.2}, {type: PokemonType.Fire, multiplier: 0.9}, {type: PokemonType.Grass, multiplier: 0.9}]),
        [WeatherType.Sunlight]:         new WeatherCondition(WeatherType.Sunlight, '#f5ac78', 'The sunlight is strong.', 10,
            [{type: PokemonType.Fire, multiplier: 1.1}, {type: PokemonType.Grass, multiplier: 1.1}]),
        [WeatherType.Sandstorm]:        new WeatherCondition(WeatherType.Sandstorm, '#d1c07d', 'A sandstorm is raging.', 10,
            [{type: PokemonType.Rock, multiplier: 1.1}, {type: PokemonType.Ground, multiplier: 1.1}, {type: PokemonType.Steel, multiplier: 1.1}]),
        [WeatherType.Fog]:              new WeatherCondition(WeatherType.Fog, '#d2c2ef', 'The fog is deep...', 10,
            [{type: PokemonType.Ghost, multiplier: 1.1}]),
        [WeatherType.Winds]:            new WeatherCondition(WeatherType.Winds, '#81c4ca', 'Mysterious strong winds blow.', 0,
            [{type: PokemonType.Flying, multiplier: 1.2}, {type: PokemonType.Dragon, multiplier: 1.1}]),
    }

    /**
     * The probability distribution for Weather conditions
     */
    public static weatherDistribution: { [region in GameConstants.Region]?: WeatherType[] } = {
        [GameConstants.Region.kanto]: [
            WeatherType.Clear,
            WeatherType.Cloudy,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Sunlight,
        ],
        [GameConstants.Region.johto]: [
            WeatherType.Clear,
            WeatherType.Cloudy,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Snow,
            WeatherType.Hail,
            WeatherType.Blizzard,
            WeatherType.Sunlight,
        ],
        [GameConstants.Region.hoenn]: [
            WeatherType.Clear,
            WeatherType.Cloudy,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Snow,
            WeatherType.Hail,
            WeatherType.Blizzard,
            WeatherType.Sunlight,
            WeatherType.Sandstorm,
        ],
        [GameConstants.Region.sinnoh]: [
            WeatherType.Clear,
            WeatherType.Cloudy,
            WeatherType.Rain,
            WeatherType.Thunderstorm,
            WeatherType.Snow,
            WeatherType.Hail,
            WeatherType.Blizzard,
            WeatherType.Sunlight,
            WeatherType.Sandstorm,
            WeatherType.Fog,
        ],
    }

    /**
     * The period for Weather changes (in hours)
     */
    public static period = 4;

    /**
     * Generates the current Weather condition
     * @param date The current date
     */
    public static generateWeather(date: Date): void {

        // Calculating seed
        let seed = SeededRand.getDateSeed(date);
        // Adding hours
        const newHours = Math.floor(date.getHours() / this.period) * this.period;
        seed += 1000000 * newHours;

        SeededRand.seed(seed);

        Weather.weather.forEach((weather, index) => {
            const rand = SeededRand.next();
            if (!Weather.weatherDistribution[index]) {
                weather(WeatherType.Clear);
                return;
            }
            // Creating distribution
            const totalWeight = Weather.weatherDistribution[index].map(weather => Weather.weatherConditions[weather].weight).reduce((a, b) => a + b, 0);
            const weights = Weather.weatherDistribution[index].map(weather => Weather.weatherConditions[weather].weight / totalWeight);
            const cumulativeSum = (sum => value => sum += value)(0);
            const distribution = weights.map(cumulativeSum);

            for (let i = 0; i < distribution.length; i += 1) {
                if (rand <= distribution[i]) {
                    weather(Weather.weatherDistribution[index][i]);
                    return;
                }
            }
            // Set Clear if failed
            weather(WeatherType.Clear);
        });
    }
}
