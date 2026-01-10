class BattleFrontierMilestonePokemon extends BattleFrontierMilestone {
    constructor (stage: number, public pokemonName: PokemonNameType, requirement?: Requirement, image = `assets/images/items/pokemonItem/${pokemonName}.png`, repeatStage?: number) {
        super(
            stage,
            () => {
                const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BATTLEFRONTIER);
                App.game.party.gainPokemonById(pokemonMap[pokemonName].id, shiny);
                const partyPokemon = App.game.party.getPokemonByName(pokemonName);
                const stageEPModifier = this.repeatStage / 1000;
                partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, shiny, GameConstants.ShadowStatus.None, GameConstants.REWARD_EP_YIELD * stageEPModifier);
            },
            requirement,
            image,
            pokemonName,
            repeatStage
        );
    }

    get displayName() {
        return PokemonHelper.displayName(this.pokemonName);
    }
}
