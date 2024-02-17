/// <reference path="../../declarations/items/Item.d.ts"/>

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

    public static getSortedHeldItems() {
        return Object.values(ItemList).filter(i => i instanceof HeldItem).sort((a: HeldItem, b: HeldItem) => {
            return a.regionUnlocked - b.regionUnlocked;
        });
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
        private _attackBonus: number,
        regionUnlocked: GameConstants.Region,
        pokemonDescription = 'the Pokémon',
        canUse = (pokemon: PartyPokemon) => true,
        private applyBonus = () => true,
        additionDescription = '') {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that raises the attack of ${pokemonDescription} by ${((_attackBonus - 1)).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 })}${additionDescription}.`, regionUnlocked, canUse);
    }

    get attackBonus(): number {
        return this.applyBonus() ? this._attackBonus : 1;
    }
}

class TypeRestrictedAttackBonusHeldItem extends AttackBonusHeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        _attackBonus: number,
        type: PokemonType,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, _attackBonus, regionUnlocked, `${GameHelper.anOrA(PokemonType[type])} ${PokemonType[type]}-type Pokémon`, (pokemon: PartyPokemon) => {
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
        super(name, basePrice, currency, shopOptions, displayName, `A held item that increases EV gains for the holding Pokémon by ${(gainedBonus - 1).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 })}.`, regionUnlocked, (pokemon: PartyPokemon) => {
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
        pokemonDescription = 'the holding Pokémon',
        canUse = (pokemon: PartyPokemon) => true) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that earns ${pokemonDescription} ${(gainedBonus - 1).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 })} bonus Experience Points.`, regionUnlocked, canUse);
    }
}

ItemList.Wonder_Chest = new ExpGainedBonusHeldItem('Wonder_Chest', 10000, GameConstants.Currency.money, undefined, 'Wonder Chest', 1.25, GameConstants.Region.johto);
ItemList.Miracle_Chest = new ExpGainedBonusHeldItem('Miracle_Chest', 30000, GameConstants.Currency.money, { visible: new MaxRegionRequirement(GameConstants.Region.sinnoh) }, 'Miracle Chest', 1.5, GameConstants.Region.sinnoh);
ItemList.Joy_Scent = new ExpGainedBonusHeldItem('Joy_Scent', 10000, GameConstants.Currency.money, undefined, 'Joy Scent', 1.75, GameConstants.Region.hoenn, ' the holding Shadow Pokémon',
    (p) => p.shadow >= GameConstants.ShadowStatus.Shadow );
ItemList.Excite_Scent = new ExpGainedBonusHeldItem('Excite_Scent', 10000, GameConstants.Currency.money, undefined, 'Excite Scent', 2, GameConstants.Region.hoenn, 'the holding Shadow Pokémon',
    (p) => p.shadow >= GameConstants.ShadowStatus.Shadow   );
ItemList.Vivid_Scent = new ExpGainedBonusHeldItem('Vivid_Scent', 10000, GameConstants.Currency.money, undefined, 'Vivid Scent', 2.5, GameConstants.Region.hoenn, 'the holding Shadow Pokémon',
    (p) => p.shadow >= GameConstants.ShadowStatus.Shadow  );
ItemList.Muscle_Band = new AttackBonusHeldItem('Muscle_Band', 1000, GameConstants.Currency.battlePoint, undefined, 'Muscle Band', 1.05, GameConstants.Region.hoenn);
// Pokemon specific items
ItemList.Light_Ball = new AttackBonusHeldItem('Light_Ball', 10000, GameConstants.Currency.money, undefined, 'Light Ball', 1.3, GameConstants.Region.johto, 'Pikachu',
    (pokemon) => Math.floor(pokemon.id) == 25);
ItemList.Lucky_Punch = new AttackBonusHeldItem('Lucky_Punch', 10000, GameConstants.Currency.money, undefined, 'Lucky Punch', 1.3, GameConstants.Region.galar, 'Happiny, Chansey or Blissey',
    (pokemon) => Math.floor(pokemon.id) == 440 ||  Math.floor(pokemon.id) == 113 || Math.floor(pokemon.id) == 242);
ItemList.Quick_Powder = new AttackBonusHeldItem('Quick_Powder', 10000, GameConstants.Currency.money, undefined, 'Quick Powder', 1.3, GameConstants.Region.kalos, 'Ditto',
    (pokemon) => Math.floor(pokemon.id) == 132);
ItemList.Thick_Club = new AttackBonusHeldItem('Thick_Club', 10000, GameConstants.Currency.money, undefined, 'Thick Club', 1.3, GameConstants.Region.alola, 'Cubone or Marowak',
    (pokemon) => Math.floor(pokemon.id) == 104 ||  Math.floor(pokemon.id) == 105);
ItemList.Soul_Dew = new AttackBonusHeldItem('Soul_Dew', 10000, GameConstants.Currency.money, undefined, 'Soul Dew', 1.5, GameConstants.Region.hoenn, 'Latias or Latios',
    (pokemon) => Math.floor(pokemon.id) == 380 ||  Math.floor(pokemon.id) == 381);
ItemList.Adamant_Orb = new AttackBonusHeldItem('Adamant_Orb', 10000, GameConstants.Currency.money, undefined, 'Adamant Orb', 1.5, GameConstants.Region.sinnoh, 'Dialga',
    (pokemon) => Math.floor(pokemon.id) == 483);
ItemList.Lustrous_Orb = new AttackBonusHeldItem('Lustrous_Orb', 10000, GameConstants.Currency.money, undefined, 'Lustrous Orb', 1.5, GameConstants.Region.sinnoh, 'Palkia',
    (pokemon) => Math.floor(pokemon.id) == 484);
ItemList.Griseous_Orb = new AttackBonusHeldItem('Griseous_Orb', 10000, GameConstants.Currency.money, undefined, 'Griseous Orb', 1.5, GameConstants.Region.sinnoh, 'Giratina',
    (pokemon) => Math.floor(pokemon.id) == 487);
ItemList.Burn_Drive = new AttackBonusHeldItem('Burn_Drive', 10000, GameConstants.Currency.money, undefined, 'Burn Drive', 1.5, GameConstants.Region.unova, 'Genesect',
    (pokemon) => pokemon.id == 649 || pokemon.id == 649.01 || pokemon.id == 649.05 || pokemon.id == 649.06);
ItemList.Chill_Drive = new AttackBonusHeldItem('Chill_Drive', 10000, GameConstants.Currency.money, undefined, 'Chill Drive', 1.5, GameConstants.Region.unova, 'Genesect',
    (pokemon) => pokemon.id == 649 || pokemon.id == 649.02 || pokemon.id == 649.05 || pokemon.id == 649.07);
ItemList.Douse_Drive = new AttackBonusHeldItem('Douse_Drive', 10000, GameConstants.Currency.money, undefined, 'Douse Drive', 1.5, GameConstants.Region.unova, 'Genesect',
    (pokemon) => pokemon.id == 649 || pokemon.id == 649.03 || pokemon.id == 649.05 || pokemon.id == 649.08);
ItemList.Shock_Drive = new AttackBonusHeldItem('Shock_Drive', 10000, GameConstants.Currency.money, undefined, 'Shock Drive', 1.5, GameConstants.Region.unova, 'Genesect',
    (pokemon) => pokemon.id == 649 || pokemon.id == 649.04 || pokemon.id == 649.05 || pokemon.id == 649.09);
ItemList.Leek = new AttackBonusHeldItem('Leek', 10000, GameConstants.Currency.money, undefined, 'Leek', 1.3, GameConstants.Region.galar, 'Farfetch\'d or Sirfetch\'d',
    (pokemon) => Math.floor(pokemon.id) == 83 || Math.floor(pokemon.id) == 865);
ItemList.Rusted_Sword = new AttackBonusHeldItem('Rusted_Sword', 10000, GameConstants.Currency.money, undefined, 'Rusted Sword', 1.5, GameConstants.Region.galar, 'Zacian',
    (pokemon) => Math.floor(pokemon.id) == 888);
ItemList.Rusted_Shield = new AttackBonusHeldItem('Rusted_Shield', 10000, GameConstants.Currency.money, undefined, 'Rusted Shield', 1.5, GameConstants.Region.galar, 'Zamazenta',
    (pokemon) => Math.floor(pokemon.id) == 889);
ItemList.Wellspring_Mask = new AttackBonusHeldItem('Wellspring_Mask', 10000, GameConstants.Currency.money, undefined, 'Wellspring Mask', 1.5, GameConstants.Region.paldea, 'Ogerpon',
    (pokemon) => pokemon.id == 1017 || pokemon.id == 1017.01 || pokemon.id == 1017.04 || pokemon.id == 1017.05);
ItemList.Hearthflame_Mask = new AttackBonusHeldItem('Hearthflame_Mask', 10000, GameConstants.Currency.money, undefined, 'Hearthflame Mask', 1.5, GameConstants.Region.paldea, 'Ogerpon',
    (pokemon) => pokemon.id == 1017 || pokemon.id == 1017.02 || pokemon.id == 1017.04 || pokemon.id == 1017.06);
ItemList.Cornerstone_Mask = new AttackBonusHeldItem('Cornerstone_Mask', 10000, GameConstants.Currency.money, undefined, 'Cornerstone Mask', 1.5, GameConstants.Region.paldea, 'Ogerpon',
    (pokemon) => pokemon.id == 1017 || pokemon.id == 1017.03 || pokemon.id == 1017.04 || pokemon.id == 1017.07);
ItemList.Booster_Energy = new AttackBonusHeldItem('Booster_Energy', 10000, GameConstants.Currency.money, undefined, 'Booster Energy', 1.33, GameConstants.Region.paldea, /*16 Pokémon. Probably too many to list.*/'Paradox Pokémon',
    (pokemon) => [984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 1005, 1006, 1009, 1010, 1020, 1021, 1022, 1023].includes(Math.floor(pokemon.id)));
ItemList.Black_Belt = new TypeRestrictedAttackBonusHeldItem('Black_Belt', 10000, GameConstants.Currency.money, undefined, 'Black Belt', 1.2, PokemonType.Fighting, GameConstants.Region.johto);
ItemList.Black_Glasses = new TypeRestrictedAttackBonusHeldItem('Black_Glasses', 10000, GameConstants.Currency.money, undefined, 'Black Glasses', 1.2, PokemonType.Dark, GameConstants.Region.johto);
ItemList.Charcoal = new TypeRestrictedAttackBonusHeldItem('Charcoal', 10000, GameConstants.Currency.money, undefined, 'Charcoal', 1.2, PokemonType.Fire, GameConstants.Region.johto);
ItemList.Dragon_Fang = new TypeRestrictedAttackBonusHeldItem('Dragon_Fang', 10000, GameConstants.Currency.money, undefined, 'Dragon Fang', 1.2, PokemonType.Dragon, GameConstants.Region.johto);
ItemList.Magnet = new TypeRestrictedAttackBonusHeldItem('Magnet', 10000, GameConstants.Currency.money, undefined, 'Magnet', 1.2, PokemonType.Electric, GameConstants.Region.johto);
// TODO: Metal Coat is a evo-stone. Can be turned into a held item evolution
ItemList.Metal_Powder = new TypeRestrictedAttackBonusHeldItem('Metal_Powder', 10000, GameConstants.Currency.money, undefined, 'Metal Powder', 1.2, PokemonType.Steel, GameConstants.Region.johto);
ItemList.Miracle_Seed = new TypeRestrictedAttackBonusHeldItem('Miracle_Seed', 10000, GameConstants.Currency.money, undefined, 'Miracle Seed', 1.2, PokemonType.Grass, GameConstants.Region.johto);
ItemList.Mystic_Water = new TypeRestrictedAttackBonusHeldItem('Mystic_Water', 10000, GameConstants.Currency.money, undefined, 'Mystic Water', 1.2, PokemonType.Water, GameConstants.Region.johto);
ItemList.Never_Melt_Ice = new TypeRestrictedAttackBonusHeldItem('Never_Melt_Ice', 10000, GameConstants.Currency.money, undefined, 'Never-Melt Ice', 1.2, PokemonType.Ice, GameConstants.Region.johto);
ItemList.Fairy_Feather = new TypeRestrictedAttackBonusHeldItem('Fairy_Feather', 10000, GameConstants.Currency.money, undefined, 'Fairy Feather', 1.2, PokemonType.Fairy, GameConstants.Region.johto);
ItemList.Poison_Barb = new TypeRestrictedAttackBonusHeldItem('Poison_Barb', 10000, GameConstants.Currency.money, undefined, 'Poison Barb', 1.2, PokemonType.Poison, GameConstants.Region.johto);
// TODO: Hard Stone is in the underground. We can keep it there, and give it two uses.
ItemList.Rock_Incense = new TypeRestrictedAttackBonusHeldItem('Rock_Incense', 10000, GameConstants.Currency.money, undefined, 'Rock Incense', 1.2, PokemonType.Rock, GameConstants.Region.johto);
ItemList.Sharp_Beak = new TypeRestrictedAttackBonusHeldItem('Sharp_Beak', 10000, GameConstants.Currency.money, undefined, 'Sharp Beak', 1.2, PokemonType.Flying, GameConstants.Region.johto);
ItemList.Silk_Scarf = new TypeRestrictedAttackBonusHeldItem('Silk_Scarf', 10000, GameConstants.Currency.money, undefined, 'Silk Scarf', 1.2, PokemonType.Normal, GameConstants.Region.johto);
ItemList.Silver_Powder = new TypeRestrictedAttackBonusHeldItem('Silver_Powder', 10000, GameConstants.Currency.money, undefined, 'Silver Powder', 1.2, PokemonType.Bug, GameConstants.Region.johto);
ItemList.Soft_Sand = new TypeRestrictedAttackBonusHeldItem('Soft_Sand', 10000, GameConstants.Currency.money, undefined, 'Soft Sand', 1.2, PokemonType.Ground, GameConstants.Region.johto);
ItemList.Spell_Tag = new TypeRestrictedAttackBonusHeldItem('Spell_Tag', 10000, GameConstants.Currency.money, undefined, 'Spell Tag', 1.2, PokemonType.Ghost, GameConstants.Region.johto);
ItemList.Twisted_Spoon = new TypeRestrictedAttackBonusHeldItem('Twisted_Spoon', 10000, GameConstants.Currency.money, undefined, 'Twisted Spoon', 1.2, PokemonType.Psychic, GameConstants.Region.johto);

ItemList.Power_Herb = new AttackBonusHeldItem('Power_Herb', undefined, GameConstants.Currency.money, undefined, 'Power Herb', 1.5, GameConstants.Region.alola, undefined, (pokemon) => true,
    () => App.game.gameState == GameConstants.GameState.dungeon && DungeonRunner.fightingBoss(), ' against Dungeon Bosses');

ItemList.Macho_Brace = new EVsGainedBonusHeldItem('Macho_Brace', 1500, GameConstants.Currency.questPoint, undefined, 'Macho Brace', 1.5, GameConstants.Region.sinnoh);
ItemList.Power_Bracer = new EVsGainedBonusHeldItem('Power_Bracer', 2000, GameConstants.Currency.questPoint, undefined, 'Power Bracer', 2, GameConstants.Region.alola);
