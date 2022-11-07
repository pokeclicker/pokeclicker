class BattleFrontierMilestonePokemon extends BattleFrontierMilestone {
    constructor (stage: number, private pokemonName: string, requirement?: Requirement, image = `assets/images/items/pokemonItem/${pokemonName}.png`) {
        super(
            stage,
            () => {
                App.game.party.gainPokemonById(pokemonMap[pokemonName].id, PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BATTLEFRONTIER));
            },
            requirement,
            image,
            pokemonName
        );
    }

    get displayName() {
        return PokemonHelper.displayName(this.pokemonName);
    }
}
