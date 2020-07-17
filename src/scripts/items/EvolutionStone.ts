///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(GameConstants.StoneType[type], basePrice, currency);
        this.type = type;
    }

    public gain(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n);
    }

    public use(pokemon?: string) {
        const partyPokemon: PartyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(pokemon).id);
        const shiny = partyPokemon.useStone(this.type);
        return shiny;
    }
}

// TODO: Set prices for different kinds of stones
ItemList['Fire_stone']    = new EvolutionStone(GameConstants.StoneType.Fire_stone, 2500);
ItemList['Water_stone']   = new EvolutionStone(GameConstants.StoneType.Water_stone, 2500);
ItemList['Thunder_stone'] = new EvolutionStone(GameConstants.StoneType.Thunder_stone, 2500);
ItemList['Leaf_stone']    = new EvolutionStone(GameConstants.StoneType.Leaf_stone, 2500);
ItemList['Moon_stone']    = new EvolutionStone(GameConstants.StoneType.Moon_stone, 2500);
ItemList['Sun_stone']     = new EvolutionStone(GameConstants.StoneType.Sun_stone, 2500);
ItemList['Trade_stone']   = new EvolutionStone(GameConstants.StoneType.Trade_stone, 2500);
ItemList['Dragon_scale']  = new EvolutionStone(GameConstants.StoneType.Dragon_scale, 2500);
ItemList['Metal_coat']    = new EvolutionStone(GameConstants.StoneType.Metal_coat, 2500);
ItemList['Kings_rock']    = new EvolutionStone(GameConstants.StoneType.Kings_rock, 2500);
ItemList['Upgrade']       = new EvolutionStone(GameConstants.StoneType.Upgrade, 2500);
ItemList['Time_stone']    = new EvolutionStone(GameConstants.StoneType.Time_stone, 2500);
