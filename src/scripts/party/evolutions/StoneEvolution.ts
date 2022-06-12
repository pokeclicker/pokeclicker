///<reference path="Evolution.ts"/>
class StoneEvolution extends Evolution {
    constructor(
        basePokemon: PokemonNameType,
        public evolvedPokemon: PokemonNameType,
        public stone: GameConstants.StoneType
    ) {
        super(basePokemon);
        this.type.push(EvolutionType.Stone);
    }

    getEvolvedPokemon(): PokemonNameType {
        return this.evolvedPokemon;
    }
}
