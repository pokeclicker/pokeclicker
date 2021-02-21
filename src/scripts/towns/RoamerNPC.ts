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
        return super.dialogHTML.replace(/{ROUTE_NAME}/g, route()?.routeName);
    }
}
