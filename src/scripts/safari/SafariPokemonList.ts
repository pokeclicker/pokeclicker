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

    public static async generateKalosSafariList() {
        // Populate filler pokemon so nothing weird happens if the player enters
        // the safari before the full list is generated
        const pokemon: SafariEncounter[] = [
            new SafariEncounter('Shuckle', 2),
            new SafariEncounter('Stunfisk', 2),
            new SafariEncounter('Magmar', 2),
            new SafariEncounter('Maractus', 2),
            new SafariEncounter('Klefki', 2),
            new SafariEncounter('Breloom', 2),
            new SafariEncounter('Woobat', 2),
            new SafariEncounter('Golurk', 2),
            new SafariEncounter('Marowak', 2),
            // Water
            new SafariEncounter('Lapras', 2, [SafariEnvironments.Water]),
        ];

        SafariPokemonList.list[GameConstants.Region.kalos](pokemon);

        this.getAllFriendSafariPokemon().then((friendSafariPokemon) => {
            SeededRand.seed(+player.trainerId);
            const shuffledPokemon = new Array(GameConstants.FRIEND_SAFARI_POKEMON)
                .fill(SeededRand.shuffleArray(friendSafariPokemon)).flat();

            const batchCount = Math.ceil(shuffledPokemon.length / GameConstants.FRIEND_SAFARI_POKEMON);
            const now = new Date();
            const startIndex = (Math.floor((now.getTime() - now.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000)) % batchCount) * GameConstants.FRIEND_SAFARI_POKEMON;
            const endIndex = startIndex + GameConstants.FRIEND_SAFARI_POKEMON;

            const pokemon: SafariEncounter[] = shuffledPokemon.slice(startIndex, endIndex).map((p) => {
                return new SafariEncounter(p, 10, SafariPokemonList.getEnvironmentByPokemonType(p), true);
            });

            SafariPokemonList.list[GameConstants.Region.kalos]().splice(0, 0, ...pokemon);
        });
    }

    private static async getAllFriendSafariPokemon(): Promise<PokemonNameType[]> {
        const pokemon = [];
        let lastYield = Date.now();
        for (const p of pokemonList) {
            if (Date.now() - 25 > lastYield) {
                lastYield = Date.now();
                await new Promise(resolve => setTimeout(resolve));
            }

            if (p.id > 0 && PokemonHelper.calcNativeRegion(p.name) <= GameConstants.MAX_AVAILABLE_REGION && PokemonHelper.isObtainableAndNotEvable(p.name)) {
                pokemon.push(p.name);
            }
        }

        return pokemon;
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
