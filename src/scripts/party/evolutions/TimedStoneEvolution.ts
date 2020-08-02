class TimedStoneEvolution extends StoneEvolution {

    stone: GameConstants.StoneType;
    startHour: number; // including
    endHour: number; // excluding

    constructor(basePokemon: string, evolution: string, startHour: number, endHour: number, stone: GameConstants.StoneType = GameConstants.StoneType.Time_stone) {
        super(basePokemon, evolution, stone);
        this.startHour = startHour;
        this.endHour = endHour;
        this.stone = stone;
    }

    isWithinTime(): boolean {
        const currentHour = new Date().getHours();
        return this.startHour < this.endHour ?
            // If the start time is before the end time, both need to be true
            currentHour >= this.startHour && currentHour < this.endHour :
            // If the start time is after the end time, only 1 needs to be true
            currentHour >= this.startHour || currentHour < this.endHour;
    }

    isSatisfied(): boolean {
        // Check that evolution is within reached regions
        return PokemonHelper.calcNativeRegion(this.evolvedPokemon) <= player.highestRegion()
        // Check current time within evolution hours
        && this.isWithinTime();
    }
}

class DayTimedStoneEvolution extends TimedStoneEvolution {
    constructor(basePokemon: string, evolution: string, stone: GameConstants.StoneType = GameConstants.StoneType.Time_stone) {
        super(basePokemon, evolution, 6, 18, stone);
    }
}
class NightTimedStoneEvolution extends TimedStoneEvolution {
    constructor(basePokemon: string, evolution: string, stone: GameConstants.StoneType = GameConstants.StoneType.Time_stone) {
        super(basePokemon, evolution, 18, 6, stone);
    }
}