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
        if (SafariPokemonList.list[this.parent.region]) {
            const safariPokemon = SafariPokemonList.list[this.parent.region]()[0].safariPokemon.map(p => p.name);

            if (!RouteHelper.listCompleted(safariPokemon, false)) {
                return areaStatus.uncaughtPokemon;
            } else if (!RouteHelper.listCompleted(safariPokemon, true)) {
                return areaStatus.uncaughtShinyPokemon;
            } else if (RouteHelper.minPokerus(safariPokemon) < GameConstants.Pokerus.Resistant) {
                return areaStatus.missingResistant;
            }
        }

        return areaStatus.completed;
    }
}
