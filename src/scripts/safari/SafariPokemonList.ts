type SafariType = {
    name: PokemonNameType,
    weight: number
}

class SafariPokemonList {
    public safariPokemon: SafariType[];
    public static list: Record<GameConstants.Region, KnockoutObservableArray<SafariPokemonList>> = {};

    constructor(safariPokemon: SafariType[]) {
        this.safariPokemon = safariPokemon;
    }

    public static generateSafariLists() {
        const safariRegions = [GameConstants.Region.kanto];

        for (const region of safariRegions) {
            if (!SafariPokemonList.list[region]) {
                SafariPokemonList.list[region] = ko.observableArray();
            } else {
                SafariPokemonList.list[region].removeAll();
            }
        }

        SafariPokemonList.list[GameConstants.Region.kanto].push(...this.generateKantoSafariList());
    }

    private static generateKantoSafariList() {
        // Push each zone for the region into this list
        const list = [];
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        list.push(new SafariPokemonList([
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
        ]));
        return list;
    }
}
