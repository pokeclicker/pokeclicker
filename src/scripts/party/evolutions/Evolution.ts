abstract class Evolution {
    basePokemon: string;
    evolvedPokemon: string;
    type: EvolutionType;

    constructor(basePokemon: string, evolvedPokemon: string, type: EvolutionType) {
        this.basePokemon = basePokemon;
        this.evolvedPokemon = evolvedPokemon;
        this.type = type;
    }

    isSatisfied(): boolean {
        return false;
    }

    evolve(notification: boolean = false): boolean {
        if (notification) {
            Notifier.notify(`Your ${this.basePokemon} evolved into a ${this.evolvedPokemon}`, GameConstants.NotificationOption.success);
        }
        let shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.evolvedPokemon).id, shiny);
        return shiny;
    }

}
