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
        [GameConstants.Region.kalos]: ko.observableArray(),
    };

    public static generateSafariLists() {
        this.generateKantoSafariList();
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
            return new SafariEncounter(p, 10, [SafariEnvironments.Grass], true);
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
        // Grass and Water
        pokemon.push(new SafariEncounter('Lapras', 2, [SafariEnvironments.Grass, SafariEnvironments.Water]));

        SafariPokemonList.list[GameConstants.Region.kalos](pokemon);
    }
}
