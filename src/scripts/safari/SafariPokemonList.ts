type SafariType = {
    name: PokemonNameType,
    weight: number
}

class SafariPokemonList {
    public static list: Record<GameConstants.Region, KnockoutObservable<Array<SafariType>>> = {
        [GameConstants.Region.kanto]: ko.observableArray(),
        [GameConstants.Region.kalos]: ko.observableArray(),
    };

    public static generateSafariLists() {
        this.generateKantoSafariList();
        this.generateKalosSafariList();
    }

    private static generateKantoSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        const pokemon : SafariType[] = [
            {name: 'Nidoran(F)', weight: 15},
            {name: 'Nidorina', weight: 10 },
            {name: 'Nidoran(M)', weight: 25 },
            {name: 'Nidorino', weight: 10 },
            {name: 'Exeggcute', weight: 20 },
            {name: 'Paras', weight: 5 },
            {name: 'Parasect', weight: 15 },
            {name: 'Rhyhorn', weight: 10 },
            {name: 'Chansey', weight: 4 },
            {name: 'Scyther', weight: 4 },
            {name: 'Pinsir', weight: 4 },
            {name: 'Kangaskhan', weight: 15 },
            {name: 'Tauros', weight: 10 },
            {name: 'Cubone', weight: 10 },
            {name: 'Marowak', weight: 5 },
            {name: 'Tangela', weight: 4 },
        ];

        SafariPokemonList.list[GameConstants.Region.kanto](pokemon);
    }

    public static generateKalosSafariList() {
        SeededRand.seed(+player.trainerId);
        const shuffledPokemon = SeededRand.shuffleArray(
            pokemonList.filter((p) => PokemonHelper.isObtainableAndNotEvable(p.name)
                && PokemonHelper.calcNativeRegion(p.name) <= GameConstants.MAX_AVAILABLE_REGION));

        const batchCount = Math.ceil(shuffledPokemon.length / GameConstants.FRIEND_SAFARI_POKEMON);
        const startIndex = (Math.floor((new Date()).getTime() / (24 * 60 * 60 * 1000)) % batchCount) * GameConstants.FRIEND_SAFARI_POKEMON;
        const endIndex = startIndex + GameConstants.FRIEND_SAFARI_POKEMON;

        const pokemon: SafariType[] = shuffledPokemon.slice(startIndex, endIndex).map((p) => {
            return { name: p.name, weight: 10, locked: !App.game.party.alreadyCaughtPokemonByName(p.name) };
        });

        pokemon.push({ name: 'Shuckle', weight: 2 });
        pokemon.push({ name: 'Stunfisk', weight: 2 });
        pokemon.push({ name: 'Magmar', weight: 2 });
        pokemon.push({ name: 'Maractus', weight: 2 });
        pokemon.push({ name: 'Klefki', weight: 2 });
        pokemon.push({ name: 'Breloom', weight: 2 });
        pokemon.push({ name: 'Woobat', weight: 2 });
        pokemon.push({ name: 'Golurk', weight: 2 });
        pokemon.push({ name: 'Marowak', weight: 2 });
        pokemon.push({ name: 'Lapras', weight: 2 });

        SafariPokemonList.list[GameConstants.Region.kalos](pokemon);
    }
}
