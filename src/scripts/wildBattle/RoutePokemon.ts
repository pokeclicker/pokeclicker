/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */
class RoutePokemon {
    public land: string[];
    public water: string[];
    public headbutt: string[];

    constructor({ land = [], water = [], headbutt = []}) {
        this.land = land;
        this.water = water;
        this.headbutt = headbutt;
        this.checkPokemon();
    }

    checkPokemon(): void {
        [
            ...this.land,
            ...this.water,
            ...this.headbutt,
        ].forEach(p => {
            if (pokemonMap[p].id == 0) {
                console.error('Invalid route pokemon specified:', p);
            }
        });
    }
}
