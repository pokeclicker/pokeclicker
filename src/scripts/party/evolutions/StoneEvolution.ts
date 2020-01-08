///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class StoneEvolution extends Evolution {

    stone: GameConstants.StoneType;

    constructor(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType) {
        super(basePokemon, evolvedPokemon, EvolutionType.Level);
        this.stone = stone;
    }

    isSatisfied(): boolean{
        return true;
    }
}
