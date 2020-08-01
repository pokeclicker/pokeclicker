///<reference path="TimedStoneEvolution.ts"/>

// Note that baby Pokemon cannot use this evolution as the devolution map cannot be properly inverted.
class DayNightStoneEvolution extends TimedStoneEvolution {
    constructor(basePokemon: string, dayPokemon: string, nightPokemon: string) {
        super(basePokemon, [new TimedStoneData(6, 18, dayPokemon)], nightPokemon, GameConstants.StoneType.Time_stone);
    }
}
