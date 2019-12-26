import Currency = GameConstants.Currency;

class Breeding implements Feature {
    private _eggList: Array<KnockoutObservable<Egg | void>>;
    private _eggSlots: KnockoutObservable<number>;

    constructor(eggList: Array<KnockoutObservable<Egg | void>>, eggSlots: KnockoutObservable<number>) {
        this._eggList = [ko.observable(null), ko.observable(null), ko.observable(null), ko.observable(null)];
        this._eggSlots = ko.observable(1);
    }

    public canBreedPokemon(): boolean {
        return player.hasMaxLevelPokemon() && this.hasFreeEggSlot();
    }


    public hasFreeEggSlot(): boolean {
        let counter = 0;
        for (let egg of this._eggList) {
            if (egg() !== null) {
                counter++;
            }
        }
        return counter < this._eggSlots();
    }

    public gainEgg(e: Egg) {
        for (let i = 0; i < this._eggList.length; i++) {
            if (this._eggList[i]() == null) {
                this._eggList[i](e);
                return true;
            }
        }
        console.log("Error: Could not place " + GameConstants.EggType[e.type] + " Egg");
        return false;
    }

    public gainRandomEgg() {
        this.gainEgg(this.createRandomEgg());
    }

    public progressEggs(amount: number) {
        if (OakItemRunner.isActive(GameConstants.OakItem.Blaze_Cassette)) {
            amount *= (1 + OakItemRunner.calculateBonus(GameConstants.OakItem.Blaze_Cassette) / 100)
        }
        amount = Math.round(amount);
        for (let obj of this._eggList) {
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

    public gainPokemonEgg(pokemon: CaughtPokemon) {
        if (!this.hasFreeEggSlot()) {
            Notifier.notify("You don't have any free egg slots", GameConstants.NotificationOption.warning);
            return;
        }
        let egg = this.createEgg(pokemon.name);
        pokemon.breeding(true);
        player.gainEgg(egg);
        pokemon.attackBonus(pokemon.attackBonus() + GameConstants.BREEDING_ATTACK_BONUS);
    }

    public hatchPokemonEgg(index: number) {
        let egg = player._eggList[index]();
        let shinyChance = GameConstants.SHINY_CHANCE_BREEDING - (0.5 * GameConstants.SHINY_CHANCE_BREEDING * Math.min(1, egg.shinySteps / egg.steps()));
        let shiny = PokemonFactory.generateShiny(shinyChance);

        for (let i = 0; i < player._caughtPokemonList().length; i++) {
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
        let baseForm = this.calculateBaseForm(egg.pokemon);
        if (egg.pokemon != baseForm && !player.alreadyCaughtPokemon(baseForm)) {
            Notifier.notify(`You also found ${GameHelper.anOrA(baseForm)} ${baseForm} nearby!`, GameConstants.NotificationOption.success);
            player.capturePokemon(baseForm, false, true);
        }

        player._eggList[index](null);
        GameHelper.incrementObservable(player.statistics.hatchedEggs);
        OakItemRunner.use(GameConstants.OakItem.Blaze_Cassette);
    }

    public createEgg(pokemonName: string, type = GameConstants.EggType.Pokemon): Egg {
        let dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(pokemonName);
        return new Egg(this.getSteps(dataPokemon.eggCycles), pokemonName, type);
    }

    public createTypedEgg(type: GameConstants.EggType): Egg {
        const hatch_list = HatchList[type];
        const hatchable = hatch_list.slice(0, player.highestRegion() + 1);
        let possible_hatches = [];
        hatchable.forEach((pokemon, index) => {
            if (!pokemon.length) return;
            const toAdd = possible_hatches.length || 1;
            for (let i = 0; i < toAdd; i++) {
                possible_hatches.push(pokemon);
            }
        });
        possible_hatches = possible_hatches[Math.floor(Math.random() * possible_hatches.length)];
        const pokemon = possible_hatches[Math.floor(Math.random() * possible_hatches.length)];
        return this.createEgg(pokemon, type);
    }

    public createRandomEgg(): Egg {
        let type = Math.floor(Math.random() * (Object.keys(HatchList).length - 1));
        let egg = this.createTypedEgg(type);
        egg.type = GameConstants.EggType.Mystery;
        return egg;
    }

    public createFossilEgg(fossil: string): Egg {
        let pokemonName = GameConstants.FossilToPokemon[fossil];
        return this.createEgg(pokemonName, GameConstants.EggType.Fossil);
    }

    public getSteps(eggCycles: number) {
        if (eggCycles === undefined) {
            return 500;
        } else {
            return eggCycles * 40;
        }
    };

    public getEggSlotCost(slot: number): number {
        return 500 * slot;
    }

    public calculateBaseForm(pokemonName: string): string {
        // Base form of Pokemon depends on which regions players unlocked
        if (!(pokemonName in pokemonDevolutionMap)) {
            // No devolutions at all
            return pokemonName;
        } else if (PokemonHelper.calcNativeRegion(pokemonDevolutionMap[pokemonName]) > player.highestRegion()) {
            // No further devolutions in current unlocked regions
            return pokemonName;
        } else {
            // Recurse onto its devolution
            return this.calculateBaseForm(pokemonDevolutionMap[pokemonName]);
        }
    }


    public buyEggSlot() {
        let cost: Cost = this.nextEggSlotCost();
        if (player.canAfford(cost)) {
            player.payCost(cost);
            this.gainEggSlot();
        }
    }

    get eggSlots(): KnockoutObservable<number> {
        return this._eggSlots;
    }

    public gainEggSlot() {
        this._eggSlots(this._eggSlots() + 1);
    }

    public nextEggSlotCost(): Cost {
        return new Cost(this.getEggSlotCost(this._eggSlots() + 1), Currency.questPoint);
    }

    get eggList(): Array<KnockoutObservable<Egg | void>> {
        return this._eggList;
    }

    set eggList(value: Array<KnockoutObservable<Egg | void>>) {
        this._eggList = value;
    }

//            this._eggList = savedPlayer._eggList.map((egg) => {
//             return ko.observable(egg ? new Egg(egg.totalSteps, egg.pokemon, egg.type, egg.steps, egg.shinySteps, egg.notified) : null)
//         });
//         this._eggSlots = ko.observable(savedPlayer._eggSlots != null ? savedPlayer._eggSlots : 1);
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
