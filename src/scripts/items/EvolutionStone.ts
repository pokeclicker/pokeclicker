///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType) {
        let basePrice = 2500;
        let priceMultiplier = 1;
        super(GameConstants.StoneType[type], basePrice, priceMultiplier, GameConstants.Currency.questpoint);
        this.type = type;
    }

    public buy(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n)
    }



    public use(pokemon?:string) {
        let shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        if(pokemon == "Eevee") {
            switch (this.type) {
                case GameConstants.StoneType.Fire_stone: {
                    player.capturePokemon("Flareon", shiny, false);
                    break;
                }
                case GameConstants.StoneType.Water_stone: {
                    player.capturePokemon("Vaporeon", shiny, false);
                    break;
                }
                case GameConstants.StoneType.Thunder_stone: {
                    player.capturePokemon("Jolteon", shiny, false);
                    break;
                }
            }
        }
        else {
            let evolution: string = PokemonHelper.getPokemonByName(pokemon).evolution;
            player.capturePokemon(evolution, shiny, false);
        }
        return shiny;
    }

}

ItemList['Fire_stone'] = new EvolutionStone(GameConstants.StoneType.Fire_stone);
ItemList['Water_stone'] = new EvolutionStone(GameConstants.StoneType.Water_stone);
ItemList['Thunder_stone'] = new EvolutionStone(GameConstants.StoneType.Thunder_stone);
ItemList['Leaf_stone'] = new EvolutionStone(GameConstants.StoneType.Leaf_stone);
ItemList['Moon_stone'] = new EvolutionStone(GameConstants.StoneType.Moon_stone);
ItemList['Sun_stone'] = new EvolutionStone(GameConstants.StoneType.Sun_stone);
ItemList['Trade_stone'] = new EvolutionStone(GameConstants.StoneType.Trade_stone);

