// class WeatherRestrictedLevelEvolution extends LevelEvolution {
//     constructor(
//         basePokemon: PokemonNameType,
//         evolvedPokemon: PokemonNameType,
//         level: number,
//         public weather: WeatherType[]
//     ) {
//         super(basePokemon, evolvedPokemon, level);
//         this.type.push(EvolutionType.Weather);
//     }

//     isSatisfied(): boolean {
//         return super.isSatisfied()
//             // Check Weather conditions
//             && this.weather.includes(Weather.currentWeather());
//     }
// }
