///<reference path="WorldLocation.ts"/>
class Route extends WorldLocation {

    number: number;
    pokemons: PokemonPerRoute;
    requirements: WorldRequirement[];
    isWater: boolean;


    constructor(number: number, pokemons: PokemonPerRoute, requirements: WorldRequirement[], isWater) {
        super();
        this.number = number;
        this.requirements = requirements;
        this.pokemons = pokemons;
        this.isWater = isWater;
    }


    allPokemonCaught(shiny = false) {
        const possiblePokemon: string[] = this.pokemons.land.concat(this.pokemons.water).concat(this.pokemons.headbutt);
        return App.game.party.alreadyCaughtList(possiblePokemon, shiny);
    }

    getAvailablePokemon(includeHeadButt = true) {
        let pokemonList = this.pokemons.land;
        if (App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Super_rod) || this.pokemons.land.length === 0) {
            pokemonList = pokemonList.concat(this.pokemons.water);
        }
        if (includeHeadButt) {
            pokemonList = pokemonList.concat(this.pokemons.headbutt);
        }
        return pokemonList;
    }
}
