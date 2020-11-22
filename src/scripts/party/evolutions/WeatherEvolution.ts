class WeatherEvolution extends Evolution {

    weather: WeatherType;
    evolvedPokemon: string
    triggered: boolean;

    constructor(basePokemon: string, evolvedPokemon: string, weather: WeatherType) {
        super(basePokemon);
        this.evolvedPokemon = evolvedPokemon;

        this.weather = weather;

        this.type.push(EvolutionType.Other);
    }

    getEvolvedPokemon(): string {
        return this.evolvedPokemon;
    }

    isSatisfied(): boolean {
        console.log(this);
        return super.isSatisfied()
            // Check Weather conditions
            && Weather.currentWeather() === this.weather;
    }

    evolve(): boolean {
        console.log(this);
        if (this.triggered) {
            return false;
        }
        this.triggered = true;

        // We have already obtained the evolution
        if (App.game.party.alreadyCaughtPokemonByName(this.getEvolvedPokemon() as PokemonNameType)) {
            return false;
        }

        return super.evolve(true);
    }
}
