class EvolutionStone extends CaughtIndicatingItem {

    type: GameConstants.StoneType;
    public unlockedRegion: GameConstants.Region;

    constructor(type: GameConstants.StoneType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint, displayName: string, unlockedRegion?: GameConstants.Region) {
        super(GameConstants.StoneType[type], basePrice, currency, undefined, displayName, 'An evolution item. See your Item Bag for more information.', 'evolution');
        this.type = type;
        this.unlockedRegion = unlockedRegion;
    }

    public gain(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n);
    }

    public use(amount: number, pokemon?: PokemonNameType): boolean {
        const partyPokemon: PartyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(pokemon).id);
        const shiny = partyPokemon.useStone(this.type);
        return shiny;
    }

    pokemonWithEvolution = ko.pureComputed(() => PartyController.getPokemonsWithEvolution(this.type))

    getCaughtStatus = ko.pureComputed((): CaughtStatus => {
        const statuses = this.pokemonWithEvolution().flatMap(
            (pokemon) => PartyController.getStoneEvolutionsCaughtData(pokemon.id, this.type)
        );

        return statuses.length > 0
            ? statuses.reduce((lowest, { status }) => Math.min(lowest, status), CaughtStatus.CaughtShiny)
            : undefined;
    });

    getPokerusStatus = ko.pureComputed((): GameConstants.Pokerus => {
        const statuses = this.pokemonWithEvolution().flatMap(
            (pokemon) => PartyController.getStoneEvolutionsPokerusData(pokemon.id, this.type)
        );

        return statuses.length > 0
            ? statuses.reduce((lowest, { status }) => Math.min(lowest, status), GameConstants.Pokerus.Resistant)
            : undefined;
    });

    init() {
        // If a region has already been manually set
        if (this.unlockedRegion > GameConstants.Region.none) {
            return false;
        }

        // Get a list of evolutions that use this stone, set the unlock region to the lowest region
        this.unlockedRegion = Math.min(...pokemonList.filter((p) =>
            // Filter to only include pokemon that make use of this evolution stone
            (p as PokemonListData).nativeRegion > GameConstants.Region.none
            && (p as PokemonListData).evolutions != undefined
            && (p as PokemonListData).evolutions.some(e => e.trigger === EvoTrigger.STONE && (e as StoneEvoData).stone == this.type)).map((p) =>
            // Map to the native region for evolutions that use this stone
            Math.min(...(p as PokemonListData).evolutions.filter(e => e.trigger === EvoTrigger.STONE && (e as StoneEvoData).stone == this.type)
                .map((e) => Math.max((p as PokemonListData).nativeRegion, PokemonHelper.calcNativeRegion(e.evolvedPokemon)))
                .filter((r) => r > GameConstants.Region.none))));
    }
}

// TODO: Set prices for different kinds of stones
ItemList.Leaf_stone        = new EvolutionStone(GameConstants.StoneType.Leaf_stone, 2500, undefined, 'Leaf Stone');
ItemList.Fire_stone        = new EvolutionStone(GameConstants.StoneType.Fire_stone, 2500, undefined, 'Fire Stone');
ItemList.Water_stone       = new EvolutionStone(GameConstants.StoneType.Water_stone, 2500, undefined, 'Water Stone');
ItemList.Thunder_stone     = new EvolutionStone(GameConstants.StoneType.Thunder_stone, 2500, undefined, 'Thunder Stone');
ItemList.Moon_stone        = new EvolutionStone(GameConstants.StoneType.Moon_stone, 2500, undefined, 'Moon Stone');
ItemList.Linking_cord      = new EvolutionStone(GameConstants.StoneType.Linking_cord, 2500, undefined, 'Linking Cord');
ItemList.Sun_stone         = new EvolutionStone(GameConstants.StoneType.Sun_stone, 2500, undefined, 'Sun Stone');
ItemList.Soothe_bell       = new EvolutionStone(GameConstants.StoneType.Soothe_bell, 2500, undefined , 'Soothe Bell');
ItemList.Metal_coat        = new EvolutionStone(GameConstants.StoneType.Metal_coat, 2500, undefined , 'Metal Coat');
ItemList.Kings_rock        = new EvolutionStone(GameConstants.StoneType.Kings_rock, 2500, undefined , 'King\'s Rock');
ItemList.Upgrade           = new EvolutionStone(GameConstants.StoneType.Upgrade, 2500, undefined , 'Upgrade');
ItemList.Dragon_scale      = new EvolutionStone(GameConstants.StoneType.Dragon_scale, 2500, undefined, 'Dragon Scale');
ItemList.Prism_scale       = new EvolutionStone(GameConstants.StoneType.Prism_scale, 2500, undefined , 'Prism Scale');
ItemList.Deepsea_tooth     = new EvolutionStone(GameConstants.StoneType.Deepsea_tooth, 2500, undefined , 'Deep Sea Tooth');
ItemList.Deepsea_scale     = new EvolutionStone(GameConstants.StoneType.Deepsea_scale, 2500, undefined , 'Deep Sea Scale');
ItemList.Shiny_stone       = new EvolutionStone(GameConstants.StoneType.Shiny_stone, 2500, undefined , 'Shiny Stone');
ItemList.Dusk_stone        = new EvolutionStone(GameConstants.StoneType.Dusk_stone, 2500, undefined , 'Dusk Stone');
ItemList.Dawn_stone        = new EvolutionStone(GameConstants.StoneType.Dawn_stone, 2500, undefined , 'Dawn Stone');
ItemList.Razor_claw        = new EvolutionStone(GameConstants.StoneType.Razor_claw, 2500, undefined , 'Razor Claw');
ItemList.Razor_fang        = new EvolutionStone(GameConstants.StoneType.Razor_fang, 2500, undefined , 'Razor Fang');
ItemList.Electirizer       = new EvolutionStone(GameConstants.StoneType.Electirizer, 2500, undefined , 'Electirizer');
ItemList.Magmarizer        = new EvolutionStone(GameConstants.StoneType.Magmarizer, 2500, undefined , 'Magmarizer');
ItemList.Protector         = new EvolutionStone(GameConstants.StoneType.Protector, 2500, undefined , 'Protector');
ItemList.Dubious_disc      = new EvolutionStone(GameConstants.StoneType.Dubious_disc, 2500, undefined , 'Dubious Disc');
ItemList.Reaper_cloth      = new EvolutionStone(GameConstants.StoneType.Reaper_cloth, 2500, undefined , 'Reaper Cloth');
ItemList.Black_DNA         = new EvolutionStone(GameConstants.StoneType.Black_DNA, 2500, undefined, 'Black DNA');
ItemList.White_DNA         = new EvolutionStone(GameConstants.StoneType.White_DNA, 2500, undefined, 'White DNA');
ItemList.Sachet            = new EvolutionStone(GameConstants.StoneType.Sachet, 2500, undefined , 'Sachet');
ItemList.Whipped_dream     = new EvolutionStone(GameConstants.StoneType.Whipped_dream, 2500, undefined , 'Whipped Dream');
ItemList.Key_stone          = new EvolutionStone(GameConstants.StoneType.Key_stone, 25000, GameConstants.Currency.battlePoint, 'Key Stone', GameConstants.Region.kalos);
ItemList.Ice_stone         = new EvolutionStone(GameConstants.StoneType.Ice_stone, 2500, undefined , 'Ice Stone');
ItemList.Solar_light       = new EvolutionStone(GameConstants.StoneType.Solar_light, 2500, undefined, 'Solar Light');
ItemList.Lunar_light       = new EvolutionStone(GameConstants.StoneType.Lunar_light, 2500, undefined, 'Lunar Light');
ItemList.Pure_light       = new EvolutionStone(GameConstants.StoneType.Pure_light, 2500, undefined, 'Pure Light');
ItemList.Sweet_apple       = new EvolutionStone(GameConstants.StoneType.Sweet_apple, 5000, undefined , 'Sweet Apple');
ItemList.Tart_apple        = new EvolutionStone(GameConstants.StoneType.Tart_apple, 5000, undefined , 'Tart Apple');
ItemList.Cracked_pot       = new EvolutionStone(GameConstants.StoneType.Cracked_pot, 5000, undefined , 'Cracked Pot');
ItemList.Galarica_cuff     = new EvolutionStone(GameConstants.StoneType.Galarica_cuff, 5000, undefined , 'Galarica Cuff');
ItemList.Galarica_wreath   = new EvolutionStone(GameConstants.StoneType.Galarica_wreath, 5000, undefined , 'Galarica Wreath');
ItemList.Black_mane_hair   = new EvolutionStone(GameConstants.StoneType.Black_mane_hair, 2500, undefined, 'Black Mane Hair');
ItemList.White_mane_hair   = new EvolutionStone(GameConstants.StoneType.White_mane_hair, 2500, undefined, 'White Mane Hair');
ItemList.Black_augurite     = new EvolutionStone(GameConstants.StoneType.Black_augurite, 5000, undefined , 'Black Augurite');
ItemList.Peat_block   = new EvolutionStone(GameConstants.StoneType.Peat_block, 5000, undefined , 'Peat Block');
ItemList.Auspicious_armor   = new EvolutionStone(GameConstants.StoneType.Auspicious_armor, 5000, undefined , 'Auspicious Armor');
ItemList.Malicious_armor   = new EvolutionStone(GameConstants.StoneType.Malicious_armor, 5000, undefined , 'Malicious Armor');
ItemList.Leaders_crest   = new EvolutionStone(GameConstants.StoneType.Leaders_crest, 5000, undefined , 'Leader\'s Crest');
ItemList.Gimmighoul_coin   = new EvolutionStone(GameConstants.StoneType.Gimmighoul_coin, 5000, undefined , 'Gimmighoul Coin');
