import { AchievementOption } from '../GameConstants';
import SeededRand from '../utilities/SeededRand';
import Requirement from './Requirement';

export default abstract class SelectNRequirement extends Requirement {
    constructor(private index: number, private total: number, private select: number) {
        super(1, AchievementOption.equal);
    }

    public getProgress(): number {
        this.setSeed();
        const numbersSelected = SeededRand.shuffleArray([...Array(this.total).keys()].map(i => i.toString())).slice(0, this.select).map(s => parseInt(s));
        return +(numbersSelected.includes(this.index));
    }

    abstract setSeed() : void;
}
