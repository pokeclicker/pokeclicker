class PokemonItem extends Item {

    type: GameConstants.PokemonItemType;

    constructor(pokemon: GameConstants.PokemonItemType) {
        let basePrice = GameConstants.ItemPrice[GameConstants.PokemonItemType[pokemon]];
        let priceMultiplier = 1;
        super(GameConstants.PokemonItemType[pokemon], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
        this.type = pokemon;
    }

    gain() {
        if (this.name() == "Mr_Mime") {
            player.capturePokemon("Mr. Mime", PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP))
        } else {
            player.capturePokemon(this.name(), PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP))
        }
    }

    use() {
    }

}

ItemList['Eevee'] = new PokemonItem(GameConstants.PokemonItemType.Eevee);
ItemList['Porygon'] = new PokemonItem(GameConstants.PokemonItemType.Porygon);
ItemList['Jynx'] = new PokemonItem(GameConstants.PokemonItemType.Jynx);
ItemList['Mr. Mime'] = new PokemonItem(GameConstants.PokemonItemType.Mr_Mime);
ItemList['Lickitung'] = new PokemonItem(GameConstants.PokemonItemType.Lickitung);