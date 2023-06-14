type SafariType = {
    name: PokemonNameType,
    weight: number
}

class SafariPokemonList {
    public static list: Record<GameConstants.Region, KnockoutObservable<Array<SafariType>>> = {};

    public static generateSafariLists() {
        SafariPokemonList.list[GameConstants.Region.kanto] = ko.pureComputed(() => this.generateKantoSafariList());
        SafariPokemonList.list[GameConstants.Region.kalos] = ko.pureComputed(() => this.generateKalosSafariList());
    }

    private static generateKantoSafariList() : Array<SafariType> {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        return [
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
    }

    private static generateKalosSafariList() : Array<SafariType> {
        SeededRand.seedWithDate(new Date());
        const pokemon : SafariType[] = SeededRand.shuffleArray(App.game.party.caughtPokemon.map((p) => p.name)
            .filter((p) => !PokemonHelper.hasEvableLocations(p) && Object.keys(PokemonHelper.getPokemonLocations(p)).length)
            .map((p) => {
                return {name: p, weight: 10};
            })).slice(0, 5);
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
        return pokemon;
    }
}
