class RoamerNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region
    ) {
        super(name, dialog);
    }

    get dialogHTML(): string {
        const route = RoamingPokemonList.getIncreasedChanceRouteByRegion(this.region);
        const roamers = RoamingPokemonList.getRegionalRoamers(this.region);

        // If no roaming Pokemon yet
        if (!roamers.length) {
            return `There hasn't been any reports of roaming Pokémon around ${GameConstants.camelCaseToString(GameConstants.Region[this.region])} lately..`;
        }

        return super.dialogHTML.replace(/{ROUTE_NAME}/g, route()?.routeName);
    }
}
