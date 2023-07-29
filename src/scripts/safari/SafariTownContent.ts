class SafariTownContent extends TownContent {
    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return 'Enter Safari Zone';
    }
    public onclick(): void {
        Safari.openModal();
    }
    public areaStatus(): areaStatus {
        if (!SafariPokemonList.list[player.region]) {
            return areaStatus.completed;
        }
        const pokemonStatusArray = [areaStatus.completed];
        const pokerusUnlocked = Settings.getSetting(`--${areaStatus[areaStatus.missingResistant]}`).isUnlocked();
        SafariPokemonList.list[player.region]().forEach(p => {
            if (!p.isAvailable()) {
                return;
            }
            const caughtStatus = PartyController.getCaughtStatusByName(p.name);
            if (caughtStatus == CaughtStatus.NotCaught) {
                pokemonStatusArray.push(areaStatus.uncaughtPokemon);
            } else if (caughtStatus == CaughtStatus.Caught) {
                pokemonStatusArray.push(areaStatus.uncaughtShinyPokemon);
            } else if (pokerusUnlocked && PartyController.getPokerusStatusByName(p.name) < GameConstants.Pokerus.Resistant) {
                pokemonStatusArray.push(areaStatus.missingResistant);
            }
        });
        return Math.min(...pokemonStatusArray);
    }
}
