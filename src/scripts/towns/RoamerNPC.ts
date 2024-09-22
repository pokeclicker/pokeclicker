class RoamerNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region,
        public subRegionRoamerGroup: number,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, dialog, { image: image, requirement: requirement,
            mentionsPokemon: () => RoamingPokemonList.getSubRegionalGroupRoamers(this.region, this.subRegionRoamerGroup).map(r => r.pokemonName),
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

        const roamersHTML = roamers.map(r => `<img class="npc-roamer-image" src="assets/images/pokemon/${r.pokemon.id}.png" />`).join('');

        return super.dialogHTML.replace(/{ROUTE_NAME}/g, route()?.routeName) + roamersHTML;
    }
}
