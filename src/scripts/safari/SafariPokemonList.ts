class SafariEncounter {
    constructor(
        public name: PokemonNameType,
        public weight: number,
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
        ];

        SafariPokemonList.list[GameConstants.Region.kanto](pokemon);
    }

    public static generateKalosSafariList() {
        SeededRand.seed(+player.trainerId);
        const shuffledPokemon = SeededRand.shuffleArray(
            pokemonList.filter((p) => PokemonHelper.isObtainableAndNotEvable(p.name)
                && PokemonHelper.calcNativeRegion(p.name) <= GameConstants.MAX_AVAILABLE_REGION));

        const batchCount = Math.ceil(shuffledPokemon.length / GameConstants.FRIEND_SAFARI_POKEMON);
        const now = new Date();
        const startIndex = (Math.floor((now.getTime() - now.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000)) % batchCount) * GameConstants.FRIEND_SAFARI_POKEMON;
        const endIndex = startIndex + GameConstants.FRIEND_SAFARI_POKEMON;

        const pokemon: SafariEncounter[] = shuffledPokemon.slice(startIndex, endIndex).map((p) => {
            return new SafariEncounter(p.name, 10, true);
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
        pokemon.push(new SafariEncounter('Lapras', 2));

        SafariPokemonList.list[GameConstants.Region.kalos](pokemon);
    }
}
