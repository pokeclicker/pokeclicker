/// <reference path="CaughtIndicatingItem.ts" />

class PokemonItem extends CaughtIndicatingItem {

    type: GameConstants.PokemonItemType;

    constructor(pokemon: GameConstants.PokemonItemType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(GameConstants.PokemonItemType[pokemon], basePrice, currency);
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

    getCaughtStatus(): CaughtStatus {
        return PartyController.getCaughtStatusByName(this.name());
    }

}

ItemList['Eevee']         = new PokemonItem(GameConstants.PokemonItemType.Eevee, 5000);
ItemList['Porygon']       = new PokemonItem(GameConstants.PokemonItemType.Porygon, 2000);
ItemList['Jynx']          = new PokemonItem(GameConstants.PokemonItemType.Jynx, 2500);
ItemList['Mr. Mime']      = new PokemonItem(GameConstants.PokemonItemType['Mr. Mime'], 1500);
ItemList['Lickitung']     = new PokemonItem(GameConstants.PokemonItemType.Lickitung, 1000);
ItemList['Togepi']        = new PokemonItem(GameConstants.PokemonItemType.Togepi, 2500);
ItemList['Beldum']        = new PokemonItem(GameConstants.PokemonItemType.Beldum, 5000);
ItemList['Skorupi']       = new PokemonItem(GameConstants.PokemonItemType.Skorupi, 5000);
ItemList['Combee']        = new PokemonItem(GameConstants.PokemonItemType.Combee, 5000);
ItemList['Burmy (plant)'] = new PokemonItem(GameConstants.PokemonItemType['Burmy (plant)'], 5000);
ItemList['Cherubi']       = new PokemonItem(GameConstants.PokemonItemType.Cherubi, 5000);
ItemList['Spiritomb']     = new PokemonItem(GameConstants.PokemonItemType.Spiritomb, 5000);
