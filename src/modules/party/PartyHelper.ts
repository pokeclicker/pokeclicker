import * as GameConstants from '../GameConstants';

import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class PartyHelper {
    public static calculateOnePokemonAttack(pokemon: any, region: GameConstants.Region = player.region, ignoreRegionMultiplier = false, useBaseAttack = false): number {
        let multiplier = 1;
        let attack = 0;
        const pAttack = useBaseAttack ? pokemon.baseAttack : pokemon.attack;
        const nativeRegion = PartyHelper.calcNativeRegion(pokemon.name);

        if (!ignoreRegionMultiplier && nativeRegion !== region && nativeRegion !== GameConstants.Region.none) {
            // Pokemon only retain a % of their total damage in other regions based on highest region.
            multiplier = this.getRegionAttackMultiplier();
        }
        attack = pAttack * multiplier;

        return attack;
    }

    public static getRegionAttackMultiplier(highestRegion = player.highestRegion()): number {
        // between 0.2 -> 1 based on highest region
        return Math.min(1, Math.max(0.2, 0.1 + highestRegion / 10));
    }

    public static calcNativeRegion(pokemonName: PokemonNameType) {
        const pokemon = pokemonMap[pokemonName];
        if (pokemon.nativeRegion !== undefined) {
            return pokemon.nativeRegion;
        }
        const { id } = pokemon;
        const region = GameConstants.TotalPokemonsPerRegion.findIndex((maxRegionID) => maxRegionID >= Math.floor(id));
        return region >= 0 ? region : GameConstants.Region.none;
    }

    public static calculateRegionMultiplier(pokemon: any, region = player.highestRegion()) {
        let multiplier = 1;
        const nativeRegion = PartyHelper.calcNativeRegion(pokemon.name);
        if (nativeRegion !== region && nativeRegion !== GameConstants.Region.none) {
            // Pokemon only retain a % of their total damage in other regions based on highest region.
            multiplier = this.getRegionAttackMultiplier();
        }
        return multiplier;
    }
}
