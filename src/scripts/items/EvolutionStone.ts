///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType) {
        let basePrice = 2500;
        let priceMultiplier = 1;
        super(GameConstants.StoneType[type], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
        this.type = type;
    }

    public buy(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n)
    }

    public use(pokemon?:string) {
        let shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        let evolution = EvolutionStone.computeEvolution(this.type, pokemon);
        player.capturePokemon(evolution, shiny, false);
        return shiny;
    }

    public static computeEvolution(type: GameConstants.StoneType, pokemon: string): string {
        if (pokemon == "Eevee") {
            switch (type) {
                case GameConstants.StoneType.Fire_stone: {
                    return "Flareon";
                }
                case GameConstants.StoneType.Water_stone: {
                    return "Vaporeon";
                }
                case GameConstants.StoneType.Thunder_stone: {
                    return "Jolteon";
                }
            }
        } else if (pokemon == "Gloom") {
            switch (type) {
                case GameConstants.StoneType.Leaf_stone: {
                    return "Vileplume";
                }
                case GameConstants.StoneType.Sun_stone: {
                    return "Bellossom";
                }
            }
        }
        else {
            return PokemonHelper.getPokemonByName(pokemon).evolution;
        }
    }
}

ItemList['Fire_stone'] = new EvolutionStone(GameConstants.StoneType.Fire_stone);
ItemList['Water_stone'] = new EvolutionStone(GameConstants.StoneType.Water_stone);
ItemList['Thunder_stone'] = new EvolutionStone(GameConstants.StoneType.Thunder_stone);
ItemList['Leaf_stone'] = new EvolutionStone(GameConstants.StoneType.Leaf_stone);
ItemList['Moon_stone'] = new EvolutionStone(GameConstants.StoneType.Moon_stone);
ItemList['Sun_stone'] = new EvolutionStone(GameConstants.StoneType.Sun_stone);
ItemList['Trade_stone'] = new EvolutionStone(GameConstants.StoneType.Trade_stone);

