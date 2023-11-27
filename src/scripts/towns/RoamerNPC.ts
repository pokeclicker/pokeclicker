class RoamerNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region,
        public subRegionRoamerGroup: number,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, dialog, {
            image: image,
            requirement: requirement,
            afterOpenFunction: (modal) => $(modal).find('[data-toggle="tooltip"]').tooltip(),
        });
    }

    get dialogHTML(): string {
        const route = RoamingPokemonList.getIncreasedChanceRouteBySubRegionGroup(this.region, this.subRegionRoamerGroup);
        const roamers = RoamingPokemonList.getSubRegionalGroupRoamers(this.region, this.subRegionRoamerGroup);

        // If no roaming Pokemon yet
        if (!roamers.length) {
            const regionName = RoamingPokemonList.roamerGroups[this.region]?.[this.subRegionRoamerGroup]?.name
                ?? GameConstants.camelCaseToString(GameConstants.Region[this.region]);
            return `There haven't been any reports of roaming Pokémon around ${regionName} lately.`;
        }

        roamers.forEach((roamer) => {
            if (App.game.statistics.pokemonEncountered[roamer.pokemon.id]() === 0 && App.game.statistics.pokemonSeen[roamer.pokemon.id]() === 0) {
                GameHelper.incrementObservable(App.game.statistics.pokemonSeen[roamer.pokemon.id]);
            }
        });

        const roamersHTML = roamers.map(({pokemon}) => {
            let html = `<img class="npc-roamer-image" src="assets/images/pokemon/${pokemon.id}.png" />`;
            const partyPokemon = App.game.party.getPokemonByName(pokemon.name);
            if (partyPokemon?.pokerus) {
                html += `<img class="d-block mx-auto" data-toggle="tooltip" title="EVs: ${partyPokemon.evs()}" src="assets/images/breeding/pokerus/${GameConstants.Pokerus[partyPokemon.pokerus]}.png" />`;
            }
            return `<div class="mb-1">${html}</div>`;
        }).join('');

        return `${super.dialogHTML.replace(/{ROUTE_NAME}/g, route()?.routeName)}<div class="d-flex flex-wrap justify-content-around">${roamersHTML}</div>`;
    }
}
