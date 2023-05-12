import MultiplierType from './MultiplierType';
import GameHelper from '../GameHelper';

export type GetMultiplierFunction = (useBonus: boolean) => number;
export type MultTypeString = keyof typeof MultiplierType;

export default class Multiplier {
    private multipliers: Record<MultTypeString, Array<{
        bonusFunction: GetMultiplierFunction,
        source: string,
    }>>;
    constructor() {
        this.multipliers = GameHelper.objectFromEnumStrings(MultiplierType, () => []);
    }

    addBonus(type: MultTypeString, bonusFunction: GetMultiplierFunction, source: string) {
        this.multipliers[type].push({ bonusFunction, source });
    }

    // useBonus is passed to the multiplier function to let it know if we are actually going to use the bonus it gives.
    // This is so that we can calculate the bonus without gaining oakitem exp or logging statistics
    getBonus(type: MultTypeString, useBonus: boolean = false): number {
        return this.multipliers[type].reduce((bonus: number, { bonusFunction }) => bonus * bonusFunction(useBonus), 1);
    }
}
