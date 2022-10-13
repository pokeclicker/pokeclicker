class BattleFrontierMilestonePokemon extends BattleFrontierMilestone {
    pokemonName: string;

    constructor (stage: number, pokemonName: string, requirement?: Requirement, image = `assets/images/items/pokemonItem/${pokemonName}.png`) {
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
}
