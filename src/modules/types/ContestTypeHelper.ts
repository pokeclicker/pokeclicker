import ContestType from '../enums/ContestType';
import { TypeEffectivenessValue } from '../GameConstants';
import GameHelper from '../GameHelper';

export default class ContestTypeHelper {
    public static contestTypeMatrix: Array<Array<number>> = (() => {
        const imm = TypeEffectivenessValue.Immune;
        const not = TypeEffectivenessValue.NotVery;
        const neu = TypeEffectivenessValue.Neutral;
        return [
            //       B                   B
            //       E                   A
            //       A                   L
            //       U                   A
            //       T         S    T    C <- Defending type
            //  C    I    C    M    O    N
            //  O    F    U    A    U    C   Attack type
            //  O    U    T    R    G    E        |
            //  L    L    E    T    H    D        v
            [neu, not, imm, imm, not, imm], // COOL
            [not, neu, not, imm, imm, imm], // BEAUTIFUL
            [imm, not, neu, not, imm, imm], // CUTE
            [imm, imm, not, neu, not, imm], // SMART
            [not, imm, imm, not, neu, imm], // TOUGH
            [neu, neu, neu, neu, neu, not], // BALANCED
        ];
    })();

    public static getAppealModifier(attackingTypes: ContestType[], defendingTypes: ContestType[]): number {
        // return nothing if undefined
        if (!attackingTypes.length || !defendingTypes.length) {
            return 0;
        }
        // return error message if a wrong number or undefined slips in
        if (attackingTypes.some(att => !GameHelper.enumNumbers(ContestType).includes(att) || defendingTypes.some(def => !GameHelper.enumNumbers(ContestType).includes(def)))) {
            throw new Error('Invalid value being passed through contest type matrix');
        }
        // Find the effectiveness against each defending ContestType
        const defenseEffectiveness = defendingTypes.map(d => {
            let sum = 0;
            attackingTypes.forEach(a => {
                sum += ContestTypeHelper.contestTypeMatrix[a][d];
            });
            // Cap effectiveness at neutral
            return Math.min(sum, 1);
        });
        // Use the defending type against which the attacker does best
        return Math.max(...defenseEffectiveness);
    }
}
