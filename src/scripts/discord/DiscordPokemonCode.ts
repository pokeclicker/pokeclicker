class DiscordPokemonCode extends DiscordCode {
    constructor(pokemon: PokemonListData, price, description) {
        const image = `assets/images/pokemon/${pokemon.id}.png`;
        const claimFunction = () => {
            if (pokemon.nativeRegion > player.highestRegion()) {
                Notifier.notify({
                    message: 'You need to progress further to unlock this pokemon.',
                    type: NotificationConstants.NotificationOption.warning,
                });
                return false;
            }

            const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
            App.game.party.gainPokemonById(pokemon.id, shiny, true);
            // Notify that the code was activated successfully
            Notifier.notify({
                message: `You obtained a${shiny ? ' shiny' : ''} ${pokemon.name}!`,
                type: NotificationConstants.NotificationOption.success,
                timeout: 1e4,
            });
            return true;
        };
        super(pokemon.name, image, price, description, claimFunction);
    }
}
