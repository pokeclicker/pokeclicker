///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class StoneEvolution extends Evolution {

    stone: GameConstants.StoneType;
    evolvedPokemon: string

    constructor(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType) {
        super(basePokemon);
        this.stone = stone;
        this.evolvedPokemon = evolvedPokemon;
        this.type.push(EvolutionType.Stone);
    }

    getEvolvedPokemon(): string {
        return this.evolvedPokemon;
    }
}
