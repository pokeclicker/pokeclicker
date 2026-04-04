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
    public areaStatus(): areaStatus[] {
        if (!SafariPokemonList.list[player.region]) {
            return [areaStatus.completed];
        }
        const pokemonStatusArray = [areaStatus.completed];
        const safariEncounters = SafariPokemonList.list[player.region]().filter(p => p.isAvailable()).map(p => p.name) as PokemonNameType[];
        return [areaStatus.completed, ...MapHelper.getPokemonAreaStatus(safariEncounters)];
    }
}
