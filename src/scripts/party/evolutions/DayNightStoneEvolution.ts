///<reference path="TimedStoneEvolution.ts"/>
class DayNightStoneEvolution extends TimedStoneEvolution {
    constructor(basePokemon: string, dayPokemon: string, nightPokemon: string) {
        super(basePokemon, [new TimedStoneData(6, 18, dayPokemon)], nightPokemon, GameConstants.StoneType.Time_stone);
    }
}
