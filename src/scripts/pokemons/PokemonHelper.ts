///<reference path="../GameConstants.d.ts"/>

class PokemonHelper extends TmpPokemonHelper {
    public static isMegaEvolution(pokemonName: PokemonNameType): boolean {
        return PokemonHelper.getPokemonPrevolution(pokemonName).some((e) => e.evolvedPokemon == pokemonName && e.restrictions.some((r) => r instanceof MegaEvolveRequirement));
    }
}
