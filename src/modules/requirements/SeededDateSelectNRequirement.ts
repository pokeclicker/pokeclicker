import SeededRand from '../utilities/SeededRand';
import SelectNRequirement from './SelectNRequirement';

export default class SeededDateSelectNRequirement extends SelectNRequirement {
    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }

    setSeed(): void {
        SeededRand.seedWithDate(new Date());
    }
}
