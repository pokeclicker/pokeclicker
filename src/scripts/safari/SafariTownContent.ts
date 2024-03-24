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
    public areaStatus(): AreaStatus {
        if (!SafariPokemonList.list[player.region]) {
            return AreaStatus.completed;
        }
        const pokemonStatusArray = [AreaStatus.completed];
        const pokerusUnlocked = Settings.getSetting(`--${AreaStatus[AreaStatus.missingResistant]}`).isUnlocked();
        SafariPokemonList.list[player.region]().forEach(p => {
            if (!p.isAvailable()) {
                return;
            }
            const caughtStatus = PartyController.getCaughtStatusByName(p.name);
            if (caughtStatus == CaughtStatus.NotCaught) {
                pokemonStatusArray.push(AreaStatus.uncaughtPokemon);
            } else if (caughtStatus == CaughtStatus.Caught) {
                pokemonStatusArray.push(AreaStatus.uncaughtShinyPokemon);
            } else if (pokerusUnlocked && PartyController.getPokerusStatusByName(p.name) < GameConstants.Pokerus.Resistant) {
                pokemonStatusArray.push(AreaStatus.missingResistant);
            }
        });
        return Math.min(...pokemonStatusArray);
    }
}
