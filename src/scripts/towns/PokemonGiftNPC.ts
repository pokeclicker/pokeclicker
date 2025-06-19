class PokemonGiftNPC extends GiftNPC {
    constructor(
        public name: string,
        public dialog: string[],
        public giftPokemon: PokemonNameType,
        public giftImage?: string,
        options: NPCOptionalArgument = {}
    ) {
        const giftFunction = () => {
            App.game.party.gainPokemonByName(this.giftPokemon, PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_REWARD));
        };
        super(name, dialog, giftFunction, giftImage, options);
    }
}
