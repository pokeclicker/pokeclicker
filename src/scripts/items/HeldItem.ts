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

class TypeRestrictedAttackBonusHeldItem extends AttackBonusHeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public attackBonus: number,
        type: PokemonType,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, attackBonus, regionUnlocked, `a Pokémon of type ${PokemonType[type]}`, (pokemon: PartyPokemon) => {
            const dataPokemon = PokemonHelper.getPokemonById(pokemon.id);
            return dataPokemon.type1 == type || dataPokemon.type2 == type;
        }
        );
    }
}

class EVsGainedBonusHeldItem extends HeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public gainedBonus: number,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that increases the EVs the pokémon gains by ${((gainedBonus - 1) * 100).toFixed(0)}%.`, regionUnlocked, (pokemon: PartyPokemon) => {
            return pokemon.pokerus > GameConstants.Pokerus.Uninfected;
        });
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

ItemList.Wonder_Chest = new ExpGainedBonusHeldItem('Wonder_Chest', 10000, GameConstants.Currency.money, undefined, 'Wonder Chest', 1.15, GameConstants.Region.johto);
// Pokemon specific items
ItemList.Light_Ball = new AttackBonusHeldItem('Light_Ball', 10000, GameConstants.Currency.money, undefined, 'Light Ball', 1.2, GameConstants.Region.final /* GameConstants.Region.johto */, 'any Pikachu',
    (pokemon) => Math.floor(pokemon.id) == 25 );
ItemList.Quick_Powder = new AttackBonusHeldItem('Quick_Powder', 10000, GameConstants.Currency.money, undefined, 'Quick Powder', 1.2, GameConstants.Region.final /* GameConstants.Region.johto */, 'Ditto',
    (pokemon) => Math.floor(pokemon.id) == 132);
ItemList.Thick_Club = new AttackBonusHeldItem('Thick_Club', 10000, GameConstants.Currency.money, undefined, 'Thick Club', 1.2, GameConstants.Region.final /* GameConstants.Region.johto */, 'Cubone or Marowak',
    (pokemon) => Math.floor(pokemon.id) == 104 ||  Math.floor(pokemon.id) == 105);
ItemList.Leek = new AttackBonusHeldItem('Leek', 10000, GameConstants.Currency.money, undefined, 'Leek', 1.2, GameConstants.Region.galar, 'Farfetch\'d or Sirfetch\'d',
    (pokemon) => Math.floor(pokemon.id) == 83 ||  Math.floor(pokemon.id) == 865);
ItemList.Rusted_Sword = new AttackBonusHeldItem('Rusted_Sword', 10000, GameConstants.Currency.money, undefined, 'Rusted Sword', 1.5, GameConstants.Region.galar, 'Zacian',
    (pokemon) => Math.floor(pokemon.id) == 888);
ItemList.Rusted_Shield = new AttackBonusHeldItem('Rusted_Shield', 10000, GameConstants.Currency.money, undefined, 'Rusted Shield', 1.5, GameConstants.Region.galar, 'Zamazenta',
    (pokemon) => Math.floor(pokemon.id) == 889);
// Typebased attack items
ItemList.Black_Belt = new TypeRestrictedAttackBonusHeldItem('Black_Belt', 10000, GameConstants.Currency.money, undefined, 'Black Belt', 1.1, PokemonType.Fighting, GameConstants.Region.johto);
ItemList.Black_Glasses = new TypeRestrictedAttackBonusHeldItem('Black_Glasses', 10000, GameConstants.Currency.money, undefined, 'Black Glasses', 1.1, PokemonType.Dark, GameConstants.Region.johto);
ItemList.Charcoal = new TypeRestrictedAttackBonusHeldItem('Charcoal', 10000, GameConstants.Currency.money, undefined, 'Charcoal', 1.1, PokemonType.Fire, GameConstants.Region.johto);
ItemList.Dragon_Fang = new TypeRestrictedAttackBonusHeldItem('Dragon_Fang', 10000, GameConstants.Currency.money, undefined, 'Dragon Fang', 1.1, PokemonType.Dragon, GameConstants.Region.final /* GameConstants.Region.johto */);
// TODO: Hard Stone is in the underground. We can keep it there, and give it two uses.
ItemList.Magnet = new TypeRestrictedAttackBonusHeldItem('Magnet', 10000, GameConstants.Currency.money, undefined, 'Magnet', 1.1, PokemonType.Electric, GameConstants.Region.johto);
// TODO: Metal Coat is a evo-stone. Can be turned into a held item evolution
ItemList.Miracle_Seed = new TypeRestrictedAttackBonusHeldItem('Miracle_Seed', 10000, GameConstants.Currency.money, undefined, 'Miracle Seed', 1.1, PokemonType.Grass, GameConstants.Region.johto);
ItemList.Mystic_Water = new TypeRestrictedAttackBonusHeldItem('Mystic_Water', 10000, GameConstants.Currency.money, undefined, 'Mystic Water', 1.1, PokemonType.Water, GameConstants.Region.johto);
ItemList.Never_Melt_Ice = new TypeRestrictedAttackBonusHeldItem('Never_Melt_Ice', 10000, GameConstants.Currency.money, undefined, 'Never-Melt Ice', 1.1, PokemonType.Ice, GameConstants.Region.johto);
ItemList.Poison_Barb = new TypeRestrictedAttackBonusHeldItem('Poison_Barb', 10000, GameConstants.Currency.money, undefined, 'Poison Barb', 1.1, PokemonType.Poison, GameConstants.Region.johto);
ItemList.Sharp_Beak = new TypeRestrictedAttackBonusHeldItem('Sharp_Beak', 10000, GameConstants.Currency.money, undefined, 'Sharp Beak', 1.1, PokemonType.Flying, GameConstants.Region.johto);
ItemList.Silk_Scarf = new TypeRestrictedAttackBonusHeldItem('Silk_Scarf', 10000, GameConstants.Currency.money, undefined, 'Silk Scarf', 1.1, PokemonType.Normal, GameConstants.Region.johto);
ItemList.Silver_Powder = new TypeRestrictedAttackBonusHeldItem('Silver_Powder', 10000, GameConstants.Currency.money, undefined, 'Silver Powder', 1.1, PokemonType.Bug, GameConstants.Region.johto);
ItemList.Soft_Sand = new TypeRestrictedAttackBonusHeldItem('Soft_Sand', 10000, GameConstants.Currency.money, undefined, 'Soft Sand', 1.1, PokemonType.Ground, GameConstants.Region.johto);
ItemList.Spell_Tag = new TypeRestrictedAttackBonusHeldItem('Spell_Tag', 10000, GameConstants.Currency.money, undefined, 'Spell Tag', 1.1, PokemonType.Ghost, GameConstants.Region.johto);
ItemList.Twisted_Spoon = new TypeRestrictedAttackBonusHeldItem('Twisted_Spoon', 10000, GameConstants.Currency.money, undefined, 'Twisted Spoon', 1.1, PokemonType.Psychic, GameConstants.Region.johto);

ItemList.Macho_Brace = new EVsGainedBonusHeldItem('Macho_Brace', 2000, GameConstants.Currency.questPoint, undefined, 'Macho Brace', 2, GameConstants.Region.sinnoh);
