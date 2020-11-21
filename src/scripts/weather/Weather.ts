/// <reference path="./WeatherType.ts" />

class Weather {

    public static weather: KnockoutObservable<WeatherType> = ko.observable(WeatherType.Clear);

    public static image: KnockoutComputed<string> = ko.pureComputed(() => {
        return `assets/images/weather/${WeatherType[Weather.weather()]}.png`;
    });

    public static color: KnockoutComputed<string> = ko.pureComputed(() => {
        return Weather.weatherColor[Weather.weather()];
    });

    public static tooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        switch (Weather.weather()) {
            case WeatherType.Clear:
                return 'The weather is clear and pleasant.';
            case WeatherType.Cloudy:
                return 'Clouds fill the skies.';
            case WeatherType.Rain:
                return 'It\'s rainy and humid.';
            case WeatherType.Thunderstorm:
                return 'It\'s currently raining heavily with thunder.';
            case WeatherType.Snow:
                return 'It\'s cold and snowing.';
            case WeatherType.Hail:
                return 'It\'s cold and hailing.';
            case WeatherType.Blizzard:
                return 'A howling blizzard blows.';
            case WeatherType.Sunlight:
                return 'The sunlight is strong.';
            case WeatherType.Sandstorm:
                return 'A sandstorm is raging.';
            case WeatherType.Fog:
                return 'The fog is deep...';
            case WeatherType.Shadow:
                return 'A shadowy aura fills the sky.';
            case WeatherType.Winds:
                return 'Mysterious strong winds blow.';
        }
    });

    public static weatherColor: { [weather in WeatherType]?: string } = {
        [WeatherType.Clear]:            '#ffe57a',
        [WeatherType.Cloudy]:           '#bed8ff',
        [WeatherType.Rain]:             '#9db7f5',
        [WeatherType.Thunderstorm]:     '#a19288',
        [WeatherType.Snow]:             '#bbe6e6',
        [WeatherType.Hail]:             '#74e6e6',
        [WeatherType.Blizzard]:         '#98d8d8',
        [WeatherType.Sunlight]:         '#f5ac78',
        [WeatherType.Sandstorm]:        '#d1c07d',
        [WeatherType.Fog]:              '#d2c2ef',
        [WeatherType.Shadow]:           '#776991',
        [WeatherType.Winds]:            '#81c4ca',
    };

    public static weatherDistribution: { [weather in WeatherType]?: number } = {
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
        [WeatherType.Winds]:            1.0,
    };

    public static generateWeather(date: Date): void {
        SeededRand.seedWithDate(date, true);

        const rand = SeededRand.next();
        for (let i = 0; i < GameHelper.enumLength(WeatherType); i += 1) {
            if (rand <= this.weatherDistribution[i]) {
                this.weather(i);
                return;
            }
        }

        // Set Clear if failed
        this.weather(WeatherType.Clear);
    }
}
