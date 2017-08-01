class PokemonItem extends Item {

    type: GameConstants.PokemonItemType;

    constructor(pokemon: GameConstants.PokemonItemType) {
        let basePrice = 0;

        switch (pokemon) {
            case GameConstants.PokemonItemType.Eevee: {
                basePrice = GameConstants.ItemPrice.Eevee;
                break;
            }
            case GameConstants.PokemonItemType.Porygon: {
                basePrice = GameConstants.ItemPrice.Porygon;
                break;
            }
            case GameConstants.PokemonItemType.Jynx: {
                basePrice = GameConstants.ItemPrice.Jynx;
                break;
            }
            case GameConstants.PokemonItemType.Mr_Mime: {
                basePrice = GameConstants.ItemPrice.Mr_Mime;
                break;
            }
            case GameConstants.PokemonItemType.Lickitung: {
                basePrice = GameConstants.ItemPrice.Lickitung;
                break;
            }
        }

        let priceMultiplier = 1;
        super(GameConstants.PokemonItemType[pokemon], basePrice, priceMultiplier, GameConstants.Currency.questpoint);
        this.type = pokemon;
    }

    buy() {
        console.log(this.name());
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