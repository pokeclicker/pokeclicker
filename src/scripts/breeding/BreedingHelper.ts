/**
 * Created by dennis on 12-07-17.
 */
class BreedingHelper {

    public static openBreedingModal() {
        if (player.hasKeyItem("Mystery egg")) {
            Game.gameState(GameConstants.GameState.paused);
            $('#breedingModal').modal('show');
        } else {
            Notifier.notify("You do not have access to that location", GameConstants.NotificationOption.warning);
        }
    }

    public static progressEggs(amount: number) {
        if (OakItemRunner.isActive(GameConstants.OakItem.Blaze_Cassette)) {
            amount *= (1 + OakItemRunner.calculateBonus(GameConstants.OakItem.Blaze_Cassette) / 100)
        }
        amount = Math.round(amount);
        for (let obj of player.eggList) {
            let egg: Egg = obj();
            if (egg == null || egg.notified) {
                continue;
            }
            egg.steps(egg.steps() + amount);
            if (OakItemRunner.isActive(GameConstants.OakItem.Shiny_Charm)) {
                egg.shinySteps += amount;
            }
            if (egg.steps() >= egg.totalSteps) {
                if (egg.type == GameConstants.EggType.Pokemon) {
                    Notifier.notify(egg.pokemon + " is ready to hatch!", GameConstants.NotificationOption.success);
                } else {
                    Notifier.notify("An egg is ready to hatch!", GameConstants.NotificationOption.success);
                }
                egg.notified = true;
            }
        }
    }

    public static gainPokemonEgg(pokemon: CaughtPokemon) {
        if (!player.hasFreeEggSlot()) {
            Notifier.notify("You don't have any free egg slots", GameConstants.NotificationOption.warning);
            return;
        }
        let egg = this.createEgg(pokemon.name);
        pokemon.breeding(true);
        player.gainEgg(egg);
        pokemon.attackBonus(pokemon.attackBonus() + GameConstants.BREEDING_ATTACK_BONUS);
    }

    public static hatchPokemonEgg(index: number) {
        let egg = player._eggList[index]();
        let shinyChance = GameConstants.SHINY_CHANCE_BREEDING - (0.5 * GameConstants.SHINY_CHANCE_BREEDING * Math.min(1, egg.shinySteps/egg.steps()));
        let shiny = PokemonFactory.generateShiny(shinyChance);

        for (let i=0; i<player._caughtPokemonList().length; i++) {
            if (player._caughtPokemonList()[i].name == egg.pokemon) {
                if (player._caughtPokemonList()[i].breeding()) {
                    player._caughtPokemonList()[i].exp(0);
                    player._caughtPokemonList()[i].breeding(false);
                    player._caughtPokemonList()[i].checkForEvolution(true);
                }
            }
        }

        if (shiny) Notifier.notify(`✨ You hatched a shiny ${egg.pokemon}! ✨`, GameConstants.NotificationOption.warning);
        else Notifier.notify(`You hatched ${GameHelper.anOrA(egg.pokemon)} ${egg.pokemon}!`, GameConstants.NotificationOption.success);

        player.capturePokemon(egg.pokemon, shiny);

        // Capture base form if not already caught. This helps players get Gen2 Pokemon that are base form of Gen1
        let baseForm = BreedingHelper.calculateBaseForm(egg.pokemon);
        if (egg.pokemon != baseForm && !player.alreadyCaughtPokemon(baseForm)) {
            Notifier.notify(`You also found ${GameHelper.anOrA(baseForm)} ${baseForm} nearby!`, GameConstants.NotificationOption.success);
            player.capturePokemon(baseForm, false, true);
        }

        player._eggList[index](null);
        GameHelper.incrementObservable(player.statistics.hatchedEggs);
        OakItemRunner.use(GameConstants.OakItem.Blaze_Cassette);
    }

    public static createEgg(pokemonName: string, type = GameConstants.EggType.Pokemon): Egg {
        let dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(pokemonName);
        return new Egg(this.getSteps(dataPokemon.eggCycles), pokemonName, type);
    }

    public static createTypedEgg(type: GameConstants.EggType): Egg {
        const hatch_list = HatchList[type];
        const hatchable = hatch_list.slice(0, player.highestRegion() + 1);
        let possible_hatches = [];
        hatchable.forEach((pokemon, index)=>{
            if (!pokemon.length) return;
            const toAdd = possible_hatches.length || 1;
            for (let i = 0; i < toAdd; i++){
                possible_hatches.push(pokemon);
            }
        });
        possible_hatches = possible_hatches[Math.floor(Math.random() * possible_hatches.length)];
        const pokemon = possible_hatches[Math.floor(Math.random() * possible_hatches.length)];
        return BreedingHelper.createEgg(pokemon, type);
    }

    public static createRandomEgg(): Egg {
        let type = Math.floor(Math.random() * (Object.keys(HatchList).length - 1));
        let egg = BreedingHelper.createTypedEgg(type);
        egg.type = GameConstants.EggType.Mystery;
        return egg;
    }

    public static createFossilEgg(fossil: string): Egg {
        let pokemonName = GameConstants.FossilToPokemon[fossil];
        return BreedingHelper.createEgg(pokemonName, GameConstants.EggType.Fossil);
    }

    public static getSteps = function (eggCycles: number) {
        if (eggCycles === undefined) {
            return 500;
        } else {
            return eggCycles * 40;
        }
    }

    public static getEggImage(egg: Egg): string {
        let eggType = GameConstants.EggType[egg.type].toLowerCase();
        if (eggType == "pokemon") {
            let dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(egg.pokemon);
            eggType = String(dataPokemon.type1).toLowerCase();
        } else if (eggType == "fossil") {
            eggType = GameConstants.PokemonToFossil[egg.pokemon];
        }
        return "assets/images/breeding/egg" + eggType + ".png";
    }

    public static getEggSlotCost(slot: number): number {
        return 500 * slot;
    }

    public static calculateBaseForm(pokemonName: string): string {
        // Base form of Pokemon depends on which regions players unlocked
        if (!(pokemonName in pokemonDevolutionMap)) {
            // No devolutions at all
            return pokemonName;
        } else if (PokemonHelper.calcNativeRegion(pokemonDevolutionMap[pokemonName]) > player.highestRegion()) {
            // No further devolutions in current unlocked regions
            return pokemonName;
        } else {
            // Recurse onto its devolution
            return BreedingHelper.calculateBaseForm(pokemonDevolutionMap[pokemonName]);
        }
    }
}

const HatchList: { [name: number]: string[][] } = {};
HatchList[GameConstants.EggType.Fire] = [
    ["Charmander", "Vulpix", "Growlithe", "Ponyta"],
    ["Cyndaquil", "Slugma", "Houndour", "Magby"],
  ];
HatchList[GameConstants.EggType.Water] = [
    ["Squirtle", "Lapras", "Staryu", "Psyduck"],
    ["Totodile", "Wooper", "Marill", "Qwilfish"],
  ];
HatchList[GameConstants.EggType.Grass] = [
    ["Bulbasaur", "Oddish", "Tangela", "Bellsprout"],
    ["Chikorita", "Hoppip", "Sunkern"],
  ];
HatchList[GameConstants.EggType.Fighting] = [
    ["Hitmonlee", "Hitmonchan", "Machop", "Mankey"],
    ["Tyrogue"],
  ];
HatchList[GameConstants.EggType.Electric] = [
    ["Magnemite", "Pikachu", "Voltorb", "Electabuzz"],
    ["Chinchou", "Mareep", "Elekid"],
  ];
HatchList[GameConstants.EggType.Dragon] = [
    ["Dratini", "Dragonair", "Dragonite"],
    [],
  ];

document.addEventListener("DOMContentLoaded", function (event) {

    $('#breedingModal').on('hidden.bs.modal', function () {
        if (player.highestRegion() == 0) {
            MapHelper.moveToRoute(5, GameConstants.Region.kanto);
        }
        MapHelper.returnToMap();
    });

});
