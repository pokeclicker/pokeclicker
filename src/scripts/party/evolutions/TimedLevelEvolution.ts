class TimedLevelEvolution extends LevelEvolution {

    startHour: number; // including
    endHour: number; // excluding

    constructor(basePokemon: string, evolution: string, level: number, startHour: number, endHour: number) {
        super(basePokemon, evolution, level);
        this.startHour = startHour;
        this.endHour = endHour;
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
        const currentHour = new Date().getHours();
        // Check that evolution is within reached regions
        return PokemonHelper.calcNativeRegion(this.evolvedPokemon) <= player.highestRegion()
        // Check current time within evolution hours
        && this.isWithinTime()
        // Check high enough level
        && App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id).level >= this.level;
    }
}

class DayTimedLevelEvolution extends TimedLevelEvolution {
    constructor(basePokemon: string, evolution: string, level: number) {
        super(basePokemon, evolution, level, 6, 18);
    }
}
class NightTimedLevelEvolution extends TimedLevelEvolution {
    constructor(basePokemon: string, evolution: string, level: number) {
        super(basePokemon, evolution, level, 18, 6);
    }
}