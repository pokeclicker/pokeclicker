/**
 * Created by dennis on 12-07-17.
 */
class BreedingHelper {

    public static progressEggs() {
        let amount = GameConstants.BREEDING_AMOUNT;
        if (OakItemRunner.isActive("Blaze Casette")) {
            amount *= OakItemRunner.calculateBonus("Blaze Casette")
        }
        for (let egg of player.eggList) {
            egg.steps += amount;
            if (egg.steps >= egg.totalSteps) {
                //TODO hatch
            }
        }
    }

    public static createEgg(pokemonName: string): Egg {
        let dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(pokemonName);
        return new Egg(this.getSteps(dataPokemon.eggCycles), pokemonName, GameConstants.EggType.Pokemon);
    }

    public static createTypedEgg(type: GameConstants.EggType): Egg {
        let name = HatchList[type][Math.floor(Math.random() * HatchList[type].length)];
        return BreedingHelper.createEgg(name);
    }

    public static createRandomEgg(): Egg {
        let type = Math.floor(Math.random() * (Object.keys(HatchList).length - 1));
        return BreedingHelper.createTypedEgg(type);
    }

    public static getSteps = function (eggCycles: number) {
        if (eggCycles === undefined) {
            return 500;
        } else {
            return eggCycles * 40;
        }
    }
}

const HatchList: { [name: number]: string[] } = {};
HatchList[GameConstants.EggType.Fire] = ["Charmander", "Vulpix", "Growlithe", "Ponyta"];
HatchList[GameConstants.EggType.Water] = ["Squirtle", "Lapras", "Staryu", "Psyduck"];
HatchList[GameConstants.EggType.Grass] = ["Bulbasaur", "Oddish", "Tangela", "Bellsprout"];
HatchList[GameConstants.EggType.Fight] = ["Hitmonlee", "Hitmonchan", "Machop", "Mankey"];
HatchList[GameConstants.EggType.Electric] = ["Magnemite", "Pikachu", "Voltorb", "Electabuzz"];
HatchList[GameConstants.EggType.Dragon] = ["Dratini", "Dragonair", "Dragonite"];
HatchList[GameConstants.EggType.Pokemon] = [];