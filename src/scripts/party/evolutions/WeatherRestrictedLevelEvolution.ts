class WeatherRestrictedLevelEvolution extends LevelEvolution {

    weather: WeatherType[];

    constructor(basePokemon: string, evolvedPokemon: string, level: number, weather: WeatherType[]) {
        super(basePokemon, evolvedPokemon, level);

        this.weather = weather;
        this.type.push(EvolutionType.Other);
    }

    isSatisfied(): boolean {
        return super.isSatisfied()
            // Check Weather conditions
            && this.weather.includes(Weather.currentWeather());
    }
}
