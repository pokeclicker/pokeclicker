class SafariEncounter {
    constructor(
        public name: PokemonNameType,
        public weight: number,
        public environments: SafariEnvironments[] = [SafariEnvironments.Grass],
        private requireCaught = false
    ) {}

    public isAvailable(): boolean {
        return !this.requireCaught ? true : App.game.party.alreadyCaughtPokemonByName(this.name);
    }
}

class SafariPokemonList {
    public static list: Record<GameConstants.Region, KnockoutObservable<Array<SafariEncounter>>> = {
        [GameConstants.Region.kanto]: ko.observableArray(),
        [GameConstants.Region.johto]: ko.observableArray(),
        [GameConstants.Region.sinnoh]: ko.observableArray(),
        [GameConstants.Region.kalos]: ko.observableArray(),
    };

    public static generateSafariLists() {
        this.generateKantoSafariList();
        this.generateJohtoSafariList();
        this.generateSinnohSafariList();
        this.generateKalosSafariList();
    }

    private static generateKantoSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Nidoran(F)', 15),
            new SafariEncounter('Nidorina', 10),
            new SafariEncounter('Nidoran(M)', 25),
            new SafariEncounter('Nidorino', 10),
            new SafariEncounter('Exeggcute', 20),
            new SafariEncounter('Paras', 5),
            new SafariEncounter('Parasect', 15),
            new SafariEncounter('Rhyhorn', 10),
            new SafariEncounter('Chansey', 4),
            new SafariEncounter('Scyther', 4),
            new SafariEncounter('Pinsir', 4),
            new SafariEncounter('Kangaskhan', 15),
            new SafariEncounter('Tauros', 10),
            new SafariEncounter('Cubone', 10),
            new SafariEncounter('Marowak', 5),
            new SafariEncounter('Tangela', 4),
            // Water
            new SafariEncounter('Magikarp', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Psyduck', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Slowpoke', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Poliwag', 15, [SafariEnvironments.Water]),
            new SafariEncounter('Goldeen', 15, [SafariEnvironments.Water]),
            new SafariEncounter('Seaking', 5, [SafariEnvironments.Water]),
            new SafariEncounter('Dratini', 10, [SafariEnvironments.Water], true),
            new SafariEncounter('Dragonair', 4, [SafariEnvironments.Water], true),
        ];

        SafariPokemonList.list[GameConstants.Region.kanto](pokemon);
    }

    public static generateJohtoSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        // Unlocks new mons after being caught
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Caterpie', 5),
            new SafariEncounter('Metapod', 2),
            new SafariEncounter('Butterfree', 1),
            new SafariEncounter('Weedle', 5),
            new SafariEncounter('Kakuna', 2),
            new SafariEncounter('Beedrill', 1),
            new SafariEncounter('Venonat', 3),
            new SafariEncounter('Ledyba', 3),
            new SafariEncounter('Spinarak', 3),
            new SafariEncounter('Paras', 3),
            new SafariEncounter('Scyther', 3),
            new SafariEncounter('Pinsir', 2),
            new SafariEncounter('Pineco', 3),
            new SafariEncounter('Shuckle', 2),
            new SafariEncounter('Wurmple', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Silcoon', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Beautifly', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Cascoon', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Dustox', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Masquerain', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Nincada', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Kricketot', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Kricketune', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Combee', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Vespiquen', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Yanmega', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Sewaddle', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Swadloon', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Leavanny', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Venipede', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Whirlipede', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Scolipede', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Dwebble', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Durant', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Scatterbug', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Spewpa', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Grubbin', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Charjabug', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Vikavolt', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Cutiefly', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Blipbug', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Dottler', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Orbeetle', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Sizzlipede', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Snom', 2, [SafariEnvironments.Grass], true),

            // Water
            new SafariEncounter('Yanma', 1, [SafariEnvironments.Water]),
            new SafariEncounter('Surskit', 5, [SafariEnvironments.Water], true),
            new SafariEncounter('Dewpider', 5, [SafariEnvironments.Water], true),
            new SafariEncounter('Araquanid', 1, [SafariEnvironments.Water], true),
            new SafariEncounter('Wimpod', 1, [SafariEnvironments.Water], true),
            new SafariEncounter('Golisopod', 1, [SafariEnvironments.Water], true),
        ];

        SafariPokemonList.list[GameConstants.Region.johto](pokemon);
    }

    private static generateSinnohSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Tangela', 20),
            new SafariEncounter('Paras', 10),
            new SafariEncounter('Exeggcute', 10),
            new SafariEncounter('Kangaskhan', 10),
            new SafariEncounter('Hoothoot', 15),
            new SafariEncounter('Noctowl', 10),
            new SafariEncounter('Yanma', 25),
            new SafariEncounter('Shroomish', 10),
            new SafariEncounter('Gulpin', 10),
            new SafariEncounter('Kecleon', 10),
            new SafariEncounter('Tropius', 15),
            new SafariEncounter('Bibarel', 20),
            new SafariEncounter('Skorupi', 10),
            new SafariEncounter('Drapion', 5),
            new SafariEncounter('Croagunk', 10),
            new SafariEncounter('Toxicroak', 5),
            new SafariEncounter('Carnivine', 10),
            // Water
            new SafariEncounter('Magikarp', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Gyarados', 10, [SafariEnvironments.Water]),
            new SafariEncounter('Wooper', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Quagsire', 5, [SafariEnvironments.Water]),
            new SafariEncounter('Barboach', 10, [SafariEnvironments.Water]),
            new SafariEncounter('Whiscash', 5, [SafariEnvironments.Water]),
            new SafariEncounter('Carvanha', 10, [SafariEnvironments.Water]),
        ];

        SafariPokemonList.list[GameConstants.Region.sinnoh](pokemon);
    }

    public static generateKalosSafariList() {
        SeededRand.seed(+player.trainerId);

        // Obtain the list of non-EVable pokemon and shuffle it
        // There may not be an evenly divisible number of pokemon so repeat list 5 times
        const shuffledPokemon = new Array(GameConstants.FRIEND_SAFARI_POKEMON).fill(
            SeededRand.shuffleArray(
                pokemonList.filter((p) => PokemonHelper.isObtainableAndNotEvable(p.name)
                    && PokemonHelper.calcNativeRegion(p.name) <= GameConstants.MAX_AVAILABLE_REGION).map((p) => p.name))
        ).flat();

        // Rotation is fixed, use the current date to determine where in the list to select the 5 pokemon
        const batchCount = Math.ceil(shuffledPokemon.length / GameConstants.FRIEND_SAFARI_POKEMON);
        const now = new Date();
        const startIndex = (Math.floor((now.getTime() - now.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000)) % batchCount) * GameConstants.FRIEND_SAFARI_POKEMON;
        const endIndex = startIndex + GameConstants.FRIEND_SAFARI_POKEMON;

        const pokemon: SafariEncounter[] = shuffledPokemon.slice(startIndex, endIndex).map((p) => {
            return new SafariEncounter(p, 10, SafariPokemonList.getEnvironmentByPokemonType(p), true);
        });

        pokemon.push(new SafariEncounter('Shuckle', 2));
        pokemon.push(new SafariEncounter('Stunfisk', 2));
        pokemon.push(new SafariEncounter('Magmar', 2));
        pokemon.push(new SafariEncounter('Maractus', 2));
        pokemon.push(new SafariEncounter('Klefki', 2));
        pokemon.push(new SafariEncounter('Breloom', 2));
        pokemon.push(new SafariEncounter('Woobat', 2));
        pokemon.push(new SafariEncounter('Golurk', 2));
        pokemon.push(new SafariEncounter('Marowak', 2));
        // Water
        pokemon.push(new SafariEncounter('Lapras', 2, [SafariEnvironments.Water]));

        SafariPokemonList.list[GameConstants.Region.kalos](pokemon);
    }

    // Get SafariEnvironment according to the Pokemon types
    public static getEnvironmentByPokemonType(p: PokemonNameType) {
        const pokemon = PokemonHelper.getPokemonByName(p);
        const safariEnvironments = [];
        // If Pokemon is water-type, add the water environment
        if (pokemon.type1 === PokemonType.Water || pokemon.type2 === PokemonType.Water) {
            safariEnvironments.push(SafariEnvironments.Water);
        }
        const pureWater = pokemon.type1 === PokemonType.Water && pokemon.type2 === PokemonType.None;
        const waterIce = pokemon.type1 === PokemonType.Water && pokemon.type2 === PokemonType.Ice;
        const iceWater = pokemon.type1 === PokemonType.Ice && pokemon.type2 === PokemonType.Water;
        // If Pokemon is not pure water, water/ice or ice/water, add the grass environment
        if (!(pureWater || waterIce || iceWater)) {
            safariEnvironments.push(SafariEnvironments.Grass);
        }
        return safariEnvironments;
    }
}
