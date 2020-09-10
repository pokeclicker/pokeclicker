class DiscordPokemonCode extends DiscordCode {
    constructor(pokemon: DataPokemon, price, description) {
        const image = `assets/images/pokemon/${pokemon.id}.png`;
        const claimFunction = () => {
            const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
            App.game.party.gainPokemonById(pokemon.id, shiny, true);
            // Notify that the code was activated successfully
            Notifier.notify({ message: `You obtained a${shiny ? ' shiny' : ''} ${pokemon.name}!`, type: GameConstants.NotificationOption.success, timeout: 1e4 });
            return true;
        };
        super(pokemon.name, image, price, description, claimFunction);
    }
}
