class SafariTownContent extends TownContent {
    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return 'Enter Safari Zone';
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        Safari.openModal();
    }
    public areaStatus(): areaStatus {
        const pokemonStatusArray = [areaStatus.completed];
        if (!SafariPokemonList.list[player.region]) {
            return areaStatus.completed;
        }
        SafariPokemonList.list[player.region]().forEach(p => {
            const currentStatus = PartyController.getCaughtStatusByName(p.name);
            if (currentStatus == CaughtStatus.NotCaught) {
                pokemonStatusArray.push(areaStatus.uncaughtPokemon);
            } else if (currentStatus == CaughtStatus.Caught) {
                pokemonStatusArray.push(areaStatus.uncaughtShinyPokemon);
            } else if (currentStatus < GameConstants.Pokerus.Resistant) {
                pokemonStatusArray.push(areaStatus.missingResistant);
            }
        });
        return Math.min(...pokemonStatusArray);
    }
}
