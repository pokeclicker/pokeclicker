class SafariTownContent extends TownContent {
    constructor(private buttonText?: string) {
        super();
    }

    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return this.buttonText ?? 'Enter Safari Zone';
    }
    public onclick(): void {
        Safari.openModal();
    }
    public areaStatus(): MapAreaStatus {
        if (!SafariPokemonList.list[player.region]) {
            return MapAreaStatus.completed;
        }
        const pokemonStatusArray = [MapAreaStatus.completed];
        const pokerusUnlocked = Settings.getSetting(`--${MapAreaStatus[MapAreaStatus.missingResistant]}`).isUnlocked();
        SafariPokemonList.list[player.region]().forEach(p => {
            if (!p.isAvailable()) {
                return;
            }
            const caughtStatus = PartyController.getCaughtStatusByName(p.name);
            if (caughtStatus == CaughtStatus.NotCaught) {
                pokemonStatusArray.push(MapAreaStatus.uncaughtPokemon);
            } else if (caughtStatus == CaughtStatus.Caught) {
                pokemonStatusArray.push(MapAreaStatus.uncaughtShinyPokemon);
            } else if (pokerusUnlocked && PartyController.getPokerusStatusByName(p.name) < GameConstants.Pokerus.Resistant) {
                pokemonStatusArray.push(MapAreaStatus.missingResistant);
            }
        });
        return Math.min(...pokemonStatusArray);
    }
}
