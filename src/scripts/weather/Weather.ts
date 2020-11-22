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
        [WeatherType.Clear]:            new WeatherCondition(WeatherType.Clear, '#ffe57a', 'The weather is clear and pleasant.'),
        [WeatherType.Cloudy]:           new WeatherCondition(WeatherType.Cloudy, '#bed8ff', 'Clouds fill the skies.'),
        [WeatherType.Rain]:             new WeatherCondition(WeatherType.Rain, '#9db7f5', 'It\'s rainy and humid.',
            [{type: PokemonType.Water, multiplier: 1.1}]),
        [WeatherType.Thunderstorm]:     new WeatherCondition(WeatherType.Thunderstorm, '#a19288', 'It\'s currently raining heavily with thunder.',
            [{type: PokemonType.Electric, multiplier: 1.1}, {type: PokemonType.Water, multiplier: 1.1}]),
        [WeatherType.Snow]:             new WeatherCondition(WeatherType.Snow, '#bbe6e6', 'It\'s cold and snowing.',
            [{type: PokemonType.Ice, multiplier: 1.05}]),
        [WeatherType.Hail]:             new WeatherCondition(WeatherType.Hail, '#74e6e6', 'It\'s cold and hailing.',
            [{type: PokemonType.Ice, multiplier: 1.1}]),
        [WeatherType.Blizzard]:         new WeatherCondition(WeatherType.Blizzard, '#98d8d8', 'A howling blizzard blows.',
            [{type: PokemonType.Ice, multiplier: 1.2}, {type: PokemonType.Fire, multiplier: 0.9}, {type: PokemonType.Grass, multiplier: 0.9}]),
        [WeatherType.Sunlight]:         new WeatherCondition(WeatherType.Sunlight, '#f5ac78', 'The sunlight is strong.',
            [{type: PokemonType.Fire, multiplier: 1.1}, {type: PokemonType.Grass, multiplier: 1.1}]),
        [WeatherType.Sandstorm]:        new WeatherCondition(WeatherType.Sandstorm, '#d1c07d', 'A sandstorm is raging.',
            [{type: PokemonType.Rock, multiplier: 1.1}, {type: PokemonType.Ground, multiplier: 1.1}, {type: PokemonType.Steel, multiplier: 1.1}]),
        [WeatherType.Fog]:              new WeatherCondition(WeatherType.Fog, '#d2c2ef', 'The fog is deep...',
            [{type: PokemonType.Ghost, multiplier: 1.1}]),
        [WeatherType.Shadow]:           new WeatherCondition(WeatherType.Shadow, '#776991', 'A shadowy aura fills the sky.',
            [{type: PokemonType.Dark, multiplier: 1.2}]),
        [WeatherType.Winds]:            new WeatherCondition(WeatherType.Winds, '#81c4ca', 'Mysterious strong winds blow.',
            [{type: PokemonType.Flying, multiplier: 1.2}, {type: PokemonType.Dragon, multiplier: 1.1}]),
    }

    /**
     * The probability distribution for Weather conditions
     */
    public static weatherDistribution: { [region in GameConstants.Region]?: WeatherDistribution } = {
        [GameConstants.Region.kanto]: {
            [WeatherType.Clear]:            0.3,
            [WeatherType.Cloudy]:           0.4,
            [WeatherType.Rain]:             0.45,
            [WeatherType.Thunderstorm]:     0.5,
            [WeatherType.Snow]:             0.54,
            [WeatherType.Hail]:             0.57,
            [WeatherType.Blizzard]:         0.6,
            [WeatherType.Sunlight]:         0.7,
            [WeatherType.Sandstorm]:        0.8,
            [WeatherType.Fog]:              0.9,
            [WeatherType.Shadow]:           1.0,
        },
        [GameConstants.Region.johto]: {
            [WeatherType.Clear]:            0.3,
            [WeatherType.Cloudy]:           0.4,
            [WeatherType.Rain]:             0.45,
            [WeatherType.Thunderstorm]:     0.5,
            [WeatherType.Snow]:             0.54,
            [WeatherType.Hail]:             0.57,
            [WeatherType.Blizzard]:         0.6,
            [WeatherType.Sunlight]:         0.7,
            [WeatherType.Sandstorm]:        0.8,
            [WeatherType.Fog]:              0.9,
            [WeatherType.Shadow]:           1.0,
        },
        [GameConstants.Region.hoenn]: {
            [WeatherType.Clear]:            0.3,
            [WeatherType.Cloudy]:           0.4,
            [WeatherType.Rain]:             0.45,
            [WeatherType.Thunderstorm]:     0.5,
            [WeatherType.Snow]:             0.54,
            [WeatherType.Hail]:             0.57,
            [WeatherType.Blizzard]:         0.6,
            [WeatherType.Sunlight]:         0.7,
            [WeatherType.Sandstorm]:        0.8,
            [WeatherType.Fog]:              0.9,
            [WeatherType.Shadow]:           1.0,
        },
        [GameConstants.Region.sinnoh]: {
            [WeatherType.Clear]:            0.3,
            [WeatherType.Cloudy]:           0.4,
            [WeatherType.Rain]:             0.45,
            [WeatherType.Thunderstorm]:     0.5,
            [WeatherType.Snow]:             0.54,
            [WeatherType.Hail]:             0.57,
            [WeatherType.Blizzard]:         0.6,
            [WeatherType.Sunlight]:         0.7,
            [WeatherType.Sandstorm]:        0.8,
            [WeatherType.Fog]:              0.9,
            [WeatherType.Shadow]:           1.0,
        },
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
            for (let i = 0; i < GameHelper.enumLength(WeatherType); i += 1) {
                if (rand <= Weather.weatherDistribution[index][i]) {
                    weather(i);
                    return;
                }
            }
            // Set Clear if failed
            weather(WeatherType.Clear);
        });
    }
}
