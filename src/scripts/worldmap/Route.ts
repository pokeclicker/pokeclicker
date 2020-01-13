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


}