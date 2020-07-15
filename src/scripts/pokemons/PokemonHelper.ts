///<reference path="PokemonList.ts"/>
///<reference path="../GameConstants.ts"/>

class PokemonHelper {

    public static getPokemonsWithEvolution(evoType: GameConstants.StoneType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            if (!partyPokemon.evolutions) {
                return false;
            }
            for (const evolution of partyPokemon.evolutions) {
                if (evolution instanceof StoneEvolution && evolution.stone == evoType && PokemonHelper.calcNativeRegion(evolution.evolvedPokemon) <= player.highestRegion()) {
                    return true;
                }
            }
            return false;
        });
    }

    public static getEvolution(id: number, evoType: GameConstants.StoneType): string {
        const pokemon = App.game.party.caughtPokemon.find(p => p.id == id);
        if (pokemon) {
            for (const evolution of pokemon.evolutions) {
                if (evolution instanceof StoneEvolution && evolution.stone == evoType) {
                    return evolution.evolvedPokemon;
                }
            }
        }
        return '';
    }

    public static getPokemonById(id: number): DataPokemon {
        return this.getPokemonByName(pokemonMap[id].name);
    }

    public static getPokemonByName(name: string): DataPokemon {
        const basePokemon = pokemonMap[name];
        if (!basePokemon) {
            console.warn('Could not find pokemon', name);
            return;
        }

        const type1 = basePokemon['type'][0];
        const type2: PokemonType = basePokemon['type'][1] ?? PokemonType.None;

        const eggCycles: number = basePokemon['eggCycles'] || 20;
        return new DataPokemon(basePokemon['id'], basePokemon['name'], basePokemon['catchRate'], basePokemon['evolutions'], type1, type2, basePokemon['attack'], basePokemon['levelType'], basePokemon['exp'], eggCycles);
    }

    public static typeStringToId(id: string) {
        return PokemonType[id];
    }

    public static typeIdToString(id: number) {
        return PokemonType[id];
    }

    public static getImage(pokemon: PokemonInterface, shiny: boolean): string {
        let src = 'assets/images/';
        if (shiny) {
            src += 'shiny';
        }
        src += `pokemon/${pokemon.id}.png`;
        return src;
    }

    public static getPokeballImage(pokemonName: string): string {
        let src = '';
        if (App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id)) {
            src = 'assets/images/pokeball/Pokeball-';
            if (App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true)) {
                src += 'shiny-';
            }
            src += 'small.png';
        }
        return src;
    }


    public static calcNativeRegion(pokemonName: string) {
        const pokemon = PokemonHelper.getPokemonByName(pokemonName);
        const id = pokemon.id;
        if (id <= 0) {
            return Infinity;
        }
        const region = GameConstants.TotalPokemonsPerRegion.findIndex(maxRegionID => maxRegionID >= id);
        return region >= 0 ? region : Infinity;
    }

}
