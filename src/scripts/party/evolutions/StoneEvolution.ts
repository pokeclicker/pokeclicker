///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class StoneEvolution extends Evolution {

    stone: GameConstants.StoneType;
    evolvedPokemon: string

    constructor(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType) {
        super(basePokemon, EvolutionType.Level);
        this.stone = stone;
        this.evolvedPokemon = evolvedPokemon;
    }


    getEvolvedPokemon(): string {
        return this.evolvedPokemon;
    }

    isSatisfied(): boolean {
        return true;
    }
}
