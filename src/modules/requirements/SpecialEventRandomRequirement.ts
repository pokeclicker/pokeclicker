import { SpecialEventTitleType } from '../specialEvents/SpecialEventTitleType';
import SeededRand from '../utilities/SeededRand';
import SpecialEventRequirement from './SpecialEventRequirement';

export default class SpecialEventRandomRequirement extends SpecialEventRequirement {
    private isAvailable = false;

    constructor(specialEventName: SpecialEventTitleType) {
        super(specialEventName);
        this.isAvailable = SeededRand.boolean();
    }

    public getProgress(): number {
        return +(this.isAvailable && super.getProgress());
    }

    public hint(): string {
        return this.isAvailable ? super.hint() : 'The Pokémon seems to be avoiding the area this year.';
    }
}
