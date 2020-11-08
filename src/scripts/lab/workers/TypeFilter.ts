/// <reference path="./WorkerFIlter.ts" />

class TypeFilter extends WorkerFilter {

    private types: PokemonType[];

    constructor(types: PokemonType[]) {
        super((pokemon: PartyPokemon) => {
            const pokemonData = PokemonHelper.getPokemonById(pokemon.id);
            if (types.includes(pokemonData.type1) || types.includes(pokemonData.type2)) {
                return true;
            }
        }, 'Only ');
        this.types = types;
    }

    get description(): string {
        return `Only ${this.types.map(t => PokemonType[t]).join(', ').replace(/, ([\w\s]+)$/, ' and $1')} type Pokemon can work on this Research.`;
    }

}
