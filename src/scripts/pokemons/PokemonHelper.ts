///<reference path="PokemonList.ts"/>
///<reference path="../GameConstants.ts"/>

class PokemonHelper {

    public static getPokemonsWithEvolution(evoType: string) {

        return pokemonList.filter(function (pokemon) {
            if (pokemon.evoLevel && pokemon.evoLevel.includes(evoType)) {
                return !!PokemonHelper.getPokemonByName(pokemon.name).evolutionByIndex(pokemon.evoLevel.indexOf(evoType), true);
            }
        });
    }


    public static getPokemonById(id: number): DataPokemon {
        return this.getPokemonByName(pokemonMapId[id].name);
    }

    public static getPokemonByName(name: string): DataPokemon {
        let basePokemon = pokemonMap[name];
        if (!basePokemon) return;
        let type2: GameConstants.PokemonType = basePokemon["type"][1] || GameConstants.PokemonType.None;
        let evoLevel = basePokemon["evoLevel"];
        let eggCycles: number = basePokemon["eggCycles"] || 20;
        return new DataPokemon(basePokemon["id"], basePokemon["name"], basePokemon["catchRate"], basePokemon["evolutions"], basePokemon["evolution"], evoLevel, basePokemon["type"][0], type2, basePokemon["attack"], basePokemon["levelType"], basePokemon["exp"], eggCycles);
    }

    public static typeStringToId(id: string) {
        return GameConstants.PokemonType[id];
    }

    public static typeIdToString(id: number) {
        return GameConstants.PokemonType[id];
    }

    public static getImage(pokemon: pokemonInterface, shiny: boolean): string {
        let src = "assets/images/";
        if (shiny) {
            src += "shiny";
        }
        src += "pokemon/" + pokemon.id + ".png";
        return src;
    }

    public static getPokeballImage(pokemonName: string): string {
        let src = ""
        if (App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id)) {
            src = "assets/images/pokeball/Pokeball-";
            if (App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true)) {
                src += "shiny-";
            }
            src += "small.png";
        }
        return src;
    }

    public static compareBy(property: string, direction: boolean): (a: PartyPokemon, b: PartyPokemon) => number {
        return function (a, b) {
            let _a, _b, res, dir = (direction) ? -1 : 1;

            //Convert to plain JS so that observables don't need to be accessed with brackets
            _a = ko.toJS(a);
            _b = ko.toJS(b);

            //CaughtPokemon doesn't have shiny property, create one for comparison if needed
            if (property == "shiny") {
                _a.shiny = Number(App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(a.name).id, true));
                _b.shiny = Number(App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(b.name).id, true));
            }

            if (property == "attack" || property == "levelObservable" || property == "shiny") {
                dir *= -1;
            }

            //Compare by provided property
            if (_a[property] == _b[property]) {
                //If they are equal according to provided property, sort by id
                if (_a.id < _b.id) {
                    return -1;
                } else if (_a.id > _b.id) {
                    return 1;
                }
            } else if (_a[property] < _b[property]) {
                res = -1;
            } else if (_a[property] > _b[property]) {
                res = 1;
            } else {
                res = 0
            }

            return res * dir;
        }
    }

    public static calcNativeRegion(pokemonName: string) {
        let id = PokemonHelper.getPokemonByName(pokemonName).id;
        if (id > 251) {
            return GameConstants.Region.hoenn;
        } else if (id > 151) {
            return GameConstants.Region.johto;
        } else {
            return GameConstants.Region.kanto;
        }
    }

}
