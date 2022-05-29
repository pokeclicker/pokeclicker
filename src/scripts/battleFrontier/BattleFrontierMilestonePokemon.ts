class BattleFrontierMilestonePokemon extends BattleFrontierMilestone {
    constructor (stage: number, private pokemonName: string, image = 'assets/images/items/pokeball/Premierball.png') {
        super(
            stage,
            () => {
                App.game.party.gainPokemonById(pokemonMap[pokemonName].id);
            },
            image,
            pokemonName
        );
    }

    get displayName() {
        return PokemonHelper.displayName(this.pokemonName);
    }
}
