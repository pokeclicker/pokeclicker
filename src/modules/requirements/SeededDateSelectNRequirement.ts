import { AchievementOption } from '../GameConstants';
import SeededRand from '../utilities/SeededRand';
import Requirement from './Requirement';

export default class SeededDateSelectNRequirement extends Requirement {
    constructor(private index: number, private total: number, private select: number) {
        super(1, AchievementOption.equal);
    }

    public getProgress(): number {
        SeededRand.seedWithDate(new Date());
        const numbersSelected = SeededRand.shuffleArray([...Array(this.total).keys()].map(i => i.toString())).slice(0, this.select).map(s => parseInt(s));

        return +(this.index in numbersSelected);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
