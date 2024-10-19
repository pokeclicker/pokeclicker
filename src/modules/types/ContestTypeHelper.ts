import ContestType from '../enums/ContestType';
import { TypeEffectivenessValue } from '../GameConstants';

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
            //       T         S    T    C      <- Defending type
            //  C    I    C    M    O    N    N
            //  O    F    U    A    U    C    O   Attack type
            //  O    U    T    R    G    E    N        |
            //  L    L    E    T    H    D    E        v
            [neu, not, imm, imm, not, not, imm], // COOL
            [not, neu, not, imm, imm, not, imm], // BEAUTIFUL
            [imm, not, neu, not, imm, not, imm], // CUTE
            [imm, imm, not, neu, not, not, imm], // SMART
            [not, imm, imm, not, neu, not, imm], // TOUGH
            [not, not, not, not, not, not, imm], // BALANCED
            [imm, imm, imm, imm, imm, imm, imm], // NONE
        ];
    })();

    public static getAppealModifier(attackingTypes: ContestType[], defendingTypes: ContestType[]): number {
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
