class RoamerNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region,
        public subregionRoamerGroup: number,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, dialog, {image: image, requirement: requirement});
    }

    get dialogHTML(): string {
        const route = RoamingPokemonList.getIncreasedChanceRouteBySubregionGroup(this.region, this.subregionRoamerGroup);
        const roamers = RoamingPokemonList.getSubregionalGroupRoamers(this.region, this.subregionRoamerGroup);

        // If no roaming Pokemon yet
        if (!roamers.length) {
            const regionName = RoamingPokemonList.roamerGroups[this.region]?.[this.subregionRoamerGroup]?.name
                ?? GameConstants.camelCaseToString(GameConstants.Region[this.region]);
            return `There haven't been any reports of roaming Pokémon around ${regionName} lately.`;
        }

        roamers.forEach((roamer) => {
            if (App.game.statistics.pokemonEncountered[roamer.pokemon.id]() === 0 && App.game.statistics.pokemonSeen[roamer.pokemon.id]() === 0) {
                GameHelper.incrementObservable(App.game.statistics.pokemonSeen[roamer.pokemon.id]);
            }
        });

        const roamersHTML = roamers.map(r => `<img class="npc-roamer-image" src="assets/images/pokemon/${r.pokemon.id}.png" />`).join('');

        return super.dialogHTML.replace(/{ROUTE_NAME}/g, route()?.routeName) + roamersHTML;
    }
}
