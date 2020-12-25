import MultiplierType from './MultiplierType';
import GameHelper from '../GameHelper';

type GetMultiplierFunction = (useBonus: boolean) => number;
type Types = keyof typeof MultiplierType;

export default class Multiplier {
    private multipliers: Record<Types, Array<GetMultiplierFunction>>;
    constructor() {
        this.multipliers = GameHelper.objectFromEnumStrings(MultiplierType, []);
    }

    addBonus(type: MultiplierType, bonusFunction: GetMultiplierFunction) {
        this.multipliers[type].push(bonusFunction);
    }

    // useBonus is passed to the multiplier function to let it know if we are actually going to use the bonus it gives.
    // This is so that we can calculate the bonus without gaining oakitem exp or logging statistics
    getBonus(type: MultiplierType, useBonus: boolean = true) {
        this.multipliers[type].reduce((bonus, getMult) => bonus * getMult(useBonus), 1);
    }
}
