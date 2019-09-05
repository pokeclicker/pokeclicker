///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType) {
        let basePrice = GameConstants.ItemPrice.EvolutionStone;
        let priceMultiplier = 1;
        super(GameConstants.StoneType[type], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
        this.type = type;
    }

    public gain(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n)
    }

    public use(pokemon?:string) {
        let shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        let evolution = EvolutionStone.computeEvolution(this.type, pokemon);
        player.capturePokemon(evolution, shiny, false);
        if (shiny) Notifier.notify(`✨ You evolved a shiny ${evolution}! ✨`, GameConstants.NotificationOption.warning);
        return shiny;
    }

    public static computeEvolution(type: GameConstants.StoneType, pokemon: string): string {
        // Assume stones and evolutions in pokemonList are consistent in ordering
        let pkmObj = PokemonHelper.getPokemonByName(pokemon);
        let index = pkmObj.evoLevel.indexOf(GameConstants.StoneType[type]);
        return pkmObj.evolutionByIndex(index, true);
    }
}

ItemList['Fire_stone'] = new EvolutionStone(GameConstants.StoneType.Fire_stone);
ItemList['Water_stone'] = new EvolutionStone(GameConstants.StoneType.Water_stone);
ItemList['Thunder_stone'] = new EvolutionStone(GameConstants.StoneType.Thunder_stone);
ItemList['Leaf_stone'] = new EvolutionStone(GameConstants.StoneType.Leaf_stone);
ItemList['Moon_stone'] = new EvolutionStone(GameConstants.StoneType.Moon_stone);
ItemList['Sun_stone'] = new EvolutionStone(GameConstants.StoneType.Sun_stone);
ItemList['Trade_stone'] = new EvolutionStone(GameConstants.StoneType.Trade_stone);
ItemList['Dragon_scale'] = new EvolutionStone(GameConstants.StoneType.Dragon_scale);
ItemList['Metal_coat'] = new EvolutionStone(GameConstants.StoneType.Metal_coat);
ItemList['Kings_rock'] = new EvolutionStone(GameConstants.StoneType.Kings_rock);
ItemList['Upgrade'] = new EvolutionStone(GameConstants.StoneType.Upgrade);
ItemList['Time_stone'] = new EvolutionStone(GameConstants.StoneType.Time_stone);
