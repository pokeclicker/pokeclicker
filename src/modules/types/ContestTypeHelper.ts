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
            [neu, not, imm, imm, not, imm, imm], // COOL
            [not, neu, not, imm, imm, imm, imm], // BEAUTIFUL
            [imm, not, neu, not, imm, imm, imm], // CUTE
            [imm, imm, not, neu, not, imm, imm], // SMART
            [not, imm, imm, not, neu, imm, imm], // TOUGH
            [not, not, not, not, not, not, imm], // BALANCED
            [imm, imm, imm, imm, imm, imm, imm], // NONE
        ];
    })();

    public static getAppealModifier(a1: ContestType, a2: ContestType, a3: ContestType, d1:ContestType, d2: ContestType, d3: ContestType): number {
        if (a1 === ContestType.None || d1 === ContestType.None) {
            return 1;
        }

        // Apply None type where there isn't an attacking type
        // eslint-disable-next-line no-param-reassign
        a2 = a2 !== ContestType.None ? a2 : 6;
        // eslint-disable-next-line no-param-reassign
        a3 = a3 !== ContestType.None ? a3 : 6;
        // eslint-disable-next-line no-param-reassign
        d2 = d2 !== ContestType.None ? d2 : 6;
        // eslint-disable-next-line no-param-reassign
        d3 = d3 !== ContestType.None ? d3 : 6;

        let m1 = ContestTypeHelper.contestTypeMatrix[a1][d1];
        let m2 = ContestTypeHelper.contestTypeMatrix[a2][d1];
        let m3 = ContestTypeHelper.contestTypeMatrix[a3][d1];
        
        let m4 = ContestTypeHelper.contestTypeMatrix[a1][d2];
        let m5 = ContestTypeHelper.contestTypeMatrix[a2][d2];
        let m6 = ContestTypeHelper.contestTypeMatrix[a3][d2];

        let m7 = ContestTypeHelper.contestTypeMatrix[a1][d3];
        let m8 = ContestTypeHelper.contestTypeMatrix[a2][d3];
        let m9 = ContestTypeHelper.contestTypeMatrix[a3][d3];

        // Find the numbers for each type, cap at 1
        let type1 = Math.min(m1 + m2 + m3, 1);
        let type2 = Math.min(m4 + m5 + m6, 1);
        let type3 = Math.min(m7 + m8 + m9, 1);

        // Find the most effective type and use it
        return Math.max(type1, type2, type3);
    }
}
