///<reference path="Item.ts"/>

class HeldItem extends Item {
    public static heldItemSelected: KnockoutObservable<HeldItem> = ko.observable(undefined);

    regionUnlocked: GameConstants.Region;

    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        description: string,
        regionUnlocked: GameConstants.Region,
        public canUse: (pokemon: PartyPokemon) => boolean) {
        super(name, basePrice, currency, shopOptions, displayName, description, 'heldItems');
        this.regionUnlocked = regionUnlocked;
    }

    public static getHeldItems() {
        return Object.values(ItemList).filter(i => i instanceof HeldItem);
    }

    public isUnlocked() {
        return player.highestRegion() >= this.regionUnlocked;
    }
}

class AttackBonusHeldItem extends HeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public attackBonus: number,
        regionUnlocked: GameConstants.Region,
        pokemonDescription = 'the pokémon',
        canUse = (pokemon: PartyPokemon) => true) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that raises the attack of ${pokemonDescription} by ${((attackBonus - 1) * 100).toFixed(0)}%.`, regionUnlocked, canUse);
    }
}

class EVsGainedBonusHeldItem extends HeldItem { // TODO: make sure this class does something
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public gainedBonus: number,
        regionUnlocked: GameConstants.Region,
        canUse = (pokemon: PartyPokemon) => true) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that increases the EVs the pokémon gains by ${((gainedBonus - 1) * 100).toFixed(0)}%.`, regionUnlocked, canUse);
    }
}

class ExpGainedBonusHeldItem extends HeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public gainedBonus: number,
        regionUnlocked: GameConstants.Region,
        canUse = (pokemon: PartyPokemon) => true) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that earns the Pokémon ${((gainedBonus - 1) * 100).toFixed(0)}% bonus Experience Points.`, regionUnlocked, canUse);
    }
}

ItemList['Wonder_Chest'] = new ExpGainedBonusHeldItem('Wonder_Chest', 10000, GameConstants.Currency.money, undefined, 'Wonder Chest', 1.15, GameConstants.Region.johto);
ItemList['Light_Ball'] = new AttackBonusHeldItem('Light_Ball', 10000, GameConstants.Currency.money, undefined, 'Light Ball', 1.2, GameConstants.Region.final /* GameConstants.Region.johto */, 'any Pikachu',
    (pokemon) => Math.floor(pokemon.id) == 25 );
ItemList['Macho_Brace'] = new EVsGainedBonusHeldItem('Macho_Brace', 6655321, GameConstants.Currency.money, undefined, 'Macho Brace', 2, GameConstants.Region.final /* GameConstants.Region.sinnoh */);

