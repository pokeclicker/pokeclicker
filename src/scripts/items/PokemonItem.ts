class PokemonItem extends Item {

    type: GameConstants.PokemonItemType;

    constructor(pokemon: GameConstants.PokemonItemType) {
        const basePrice = GameConstants.ItemPrice[GameConstants.PokemonItemType[pokemon]];
        const priceMultiplier = 1;
        super(GameConstants.PokemonItemType[pokemon], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
        this.type = pokemon;
    }

    gain() {
        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
        const pokemonName = this.name();
        if (shiny) {
            Notifier.notify({ message: `✨ You obtained a shiny ${pokemonName}! ✨`, type: GameConstants.NotificationOption.warning });
        }
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(pokemonName).id, shiny, true);
    }

    use() {
    }

}

ItemList['Eevee'] = new PokemonItem(GameConstants.PokemonItemType.Eevee);
ItemList['Porygon'] = new PokemonItem(GameConstants.PokemonItemType.Porygon);
ItemList['Jynx'] = new PokemonItem(GameConstants.PokemonItemType.Jynx);
ItemList['Mr. Mime'] = new PokemonItem(GameConstants.PokemonItemType['Mr. Mime']);
ItemList['Lickitung'] = new PokemonItem(GameConstants.PokemonItemType.Lickitung);
ItemList['Togepi'] = new PokemonItem(GameConstants.PokemonItemType.Togepi);
ItemList['Beldum'] = new PokemonItem(GameConstants.PokemonItemType.Beldum);
