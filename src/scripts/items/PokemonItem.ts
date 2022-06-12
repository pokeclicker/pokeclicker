/// <reference path="CaughtIndicatingItem.ts" />

class PokemonItem extends CaughtIndicatingItem {

    type: PokemonNameType;

    constructor(pokemon: PokemonNameType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(pokemon, basePrice, currency, undefined, undefined, undefined, 'pokemonItem');
        this.type = pokemon;
    }

    gain(amt: number) {
        let shiny = false;
        for (let i = 0; i < amt; i++) {
            shiny = shiny || PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
        }
        const pokemonName = this.name as PokemonNameType;
        if (shiny) {
            Notifier.notify({
                message: `✨ You obtained a shiny ${pokemonName}! ✨`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(pokemonName).id, shiny, true);
    }

    getCaughtStatus(): CaughtStatus {
        return PartyController.getCaughtStatusByName(this.name as PokemonNameType);
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${this.name.replace(/[^\s\w.()-]/g, '')}.png`;
    }
}

ItemList['Eevee']                = new PokemonItem('Eevee', 4000);
ItemList['Porygon']              = new PokemonItem('Porygon', 2000);
ItemList['Jynx']                 = new PokemonItem('Jynx', 2000);
ItemList['Mr. Mime']             = new PokemonItem('Mr. Mime', 1000);
ItemList['Lickitung']            = new PokemonItem('Lickitung', 1000);
ItemList['Magikarp']             = new PokemonItem('Magikarp', 50000, Currency.money);
ItemList['Togepi']               = new PokemonItem('Togepi', 15000);
ItemList['Beldum']               = new PokemonItem('Beldum', 22500);
ItemList['Skorupi']              = new PokemonItem('Skorupi', 6750);
ItemList['Combee']               = new PokemonItem('Combee', 6750);
ItemList['Burmy (plant)']        = new PokemonItem('Burmy (plant)', 6750);
ItemList['Cherubi']              = new PokemonItem('Cherubi', 6750);
ItemList['Spiritomb']            = new PokemonItem('Spiritomb', 6750);
ItemList['Zorua']                = new PokemonItem('Zorua', 50625);
ItemList['Meloetta (pirouette)'] = new PokemonItem('Meloetta (pirouette)', 200000);
ItemList['Furfrou (Debutante)']  = new PokemonItem('Furfrou (Debutante)', 5000000000, Currency.money);
ItemList['Furfrou (Diamond)']    = new PokemonItem('Furfrou (Diamond)', 15000, Currency.diamond);
ItemList['Furfrou (Matron)']     = new PokemonItem('Furfrou (Matron)', 1500000, Currency.farmPoint);
ItemList['Furfrou (Dandy)']      = new PokemonItem('Furfrou (Dandy)', 250000);
ItemList['Furfrou (Kabuki)']     = new PokemonItem('Furfrou (Kabuki)', 75000, Currency.battlePoint);
ItemList['Furfrou (Pharaoh)']    = new PokemonItem('Furfrou (Pharaoh)', 300000000, Currency.dungeonToken);
ItemList['Type: Null']           = new PokemonItem('Type: Null', 114000);
ItemList['Poipole']              = new PokemonItem('Poipole', 90000);
ItemList['Eternatus']            = new PokemonItem('Eternatus', 50000);
ItemList['Toxel']                = new PokemonItem('Toxel', 30000);
