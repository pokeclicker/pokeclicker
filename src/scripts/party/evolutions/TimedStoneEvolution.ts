///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class TimedStoneEvolution extends Evolution {

    stone: GameConstants.StoneType;
    timeData: TimedStoneData[];
    defaultEvolution: string;

    constructor(basePokemon: string, timeData: TimedStoneData[], defaultEvolution: string, stone: GameConstants.StoneType) {
        super(basePokemon, EvolutionType.Level);
        this.stone = stone;
        this.defaultEvolution = defaultEvolution;
    }

    isSatisfied(): boolean {
        return true;
    }

    getEvolvedPokemon(): string {
        const currentHour = new Date().getHours();

        for (const timeData of this.timeData) {
            if (currentHour >= timeData.startHour && currentHour <= timeData.endHour) {
                return timeData.evolvedPokemon;
            }
        }
        return this.defaultEvolution;
    }
}

class TimedStoneData {
    // Inclusive
    startHour: number
    // Inclusive
    endHour: number
    evolvedPokemon: string


    constructor(startHour: number, endHour: number, evolvedPokemon: string) {
        this.startHour = startHour;
        this.endHour = endHour;
        this.evolvedPokemon = evolvedPokemon;
    }
}
