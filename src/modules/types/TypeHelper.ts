import PokemonType from '../enums/PokemonType';
import { TypeEffectiveness, TypeEffectivenessValue, GEM_UPGRADE_STEP } from '../GameConstants';

export default class TypeHelper {
    public static readonly typeColors = [
        '595c3b', // Normal
        'b10818', // Fire
        '294a94', // Water
        'b57b31', // Electric
        '4a944a', // Grass
        '42a59c', // Ice
        'b54a4a', // Fighting
        '7b42c6', // Poison
        '946b4a', // Ground
        '218cb5', // Flying
        'ce6363', // Psychic
        '8cb521', // Bug
        'a58c4a', // Rock
        '605a72', // Ghost
        '8c424a', // Dragon
        '4a6b84', // Dark
        '737373', // Steel
        'd694ce', // Fairy
    ];

    public static readonly typeColorsLocked = [
        'd3d4c4', // Normal
        'fb9d9d', // Fire
        '99b6ff', // Water
        'ffda99', // Electric
        'aff1a7', // Grass
        'b5efef', // Ice
        'f1bba7', // Fighting
        'e7ccff', // Poison
        'e3d1b5', // Ground
        '99dfff', // Flying
        'ffb5ad', // Psychic
        'dbf99f', // Bug
        'e3d1b5', // Rock
        'c8c3d5', // Ghost
        'e7b1b1', // Dragon
        'bcccdc', // Dark
        'cccccc', // Steel
        'ffc6e7', // Fairy
    ];

    public static typeMatrix: Array<Array<number>> = (() => {
        const imm = TypeEffectivenessValue.Immune;
        const not = TypeEffectivenessValue.NotVery;
        const neu = TypeEffectivenessValue.Neutral;
        const vry = TypeEffectivenessValue.Very;
        return [
            //                 E              F
            //                 L              I                   P
            //  N              E              G    P    G    F    S                   D
            //  O         W    C    G         H    O    R    L    Y              G    R         S    F  <- Defending type
            //  R    F    A    T    R         T    I    O    Y    C         R    H    A    D    T    A
            //  M    I    T    R    A    I    I    S    U    I    H    B    O    O    G    A    E    I   Attack type
            //  A    R    E    I    S    C    N    O    N    N    I    U    C    S    O    R    E    R        |
            //  L    E    R    C    S    E    G    N    D    G    C    G    K    T    N    K    L    Y        v
            [neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, not, imm, neu, neu, not, neu], // NORMAL
            [neu, not, not, neu, vry, vry, neu, neu, neu, neu, neu, vry, not, neu, not, neu, vry, neu], // FIRE
            [neu, vry, not, neu, not, neu, neu, neu, vry, neu, neu, neu, vry, neu, not, neu, neu, neu], // WATER
            [neu, neu, vry, not, not, neu, neu, neu, imm, vry, neu, neu, neu, neu, not, neu, neu, neu], // ELECTRIC
            [neu, not, vry, neu, not, neu, neu, not, vry, not, neu, not, vry, neu, not, neu, not, neu], // GRASS
            [neu, not, not, neu, vry, not, neu, neu, vry, vry, neu, neu, neu, neu, vry, neu, not, neu], // ICE
            [vry, neu, neu, neu, neu, vry, neu, not, neu, not, not, not, vry, imm, neu, vry, vry, not], // FIGHTING
            [neu, neu, neu, neu, vry, neu, neu, not, not, neu, neu, neu, not, not, neu, neu, imm, vry], // POISON
            [neu, vry, neu, vry, not, neu, neu, vry, neu, imm, neu, not, vry, neu, neu, neu, vry, neu], // GROUND
            [neu, neu, neu, not, vry, neu, vry, neu, neu, neu, neu, vry, not, neu, neu, neu, not, neu], // FLYING
            [neu, neu, neu, neu, neu, neu, vry, vry, neu, neu, not, neu, neu, neu, neu, imm, not, neu], // PSYCHIC
            [neu, not, neu, neu, vry, neu, not, not, neu, not, vry, neu, neu, not, neu, vry, not, not], // BUG
            [neu, vry, neu, neu, neu, vry, not, neu, not, vry, neu, vry, neu, neu, neu, neu, not, neu], // ROCK
            [imm, neu, neu, neu, neu, neu, neu, neu, neu, neu, vry, neu, neu, vry, neu, not, neu, neu], // GHOST
            [neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, neu, vry, neu, not, imm], // DRAGON
            [neu, neu, neu, neu, neu, neu, not, neu, neu, neu, vry, neu, neu, vry, neu, not, neu, not], // DARK
            [neu, not, not, not, neu, vry, neu, neu, neu, neu, neu, neu, vry, neu, neu, neu, not, vry], // STEEL
            [neu, not, neu, neu, neu, neu, vry, not, neu, neu, neu, neu, neu, neu, vry, vry, not, neu], // FAIRY
        ];
    })();

    public static getAttackModifier(a1: PokemonType, a2: PokemonType, d1: PokemonType, d2: PokemonType): number {
        if (a1 === PokemonType.None || d1 === PokemonType.None) {
            return 1;
        }

        // Apply second type as the first type when None
        // eslint-disable-next-line no-param-reassign
        a2 = a2 !== PokemonType.None ? a2 : a1;
        // eslint-disable-next-line no-param-reassign
        d2 = d2 !== PokemonType.None ? d2 : d1;

        let m1 = TypeHelper.typeMatrix[a1][d1];
        let m2 = TypeHelper.typeMatrix[a1][d2];
        let m3 = TypeHelper.typeMatrix[a2][d1];
        let m4 = TypeHelper.typeMatrix[a2][d2];

        if (!App.game.challenges.list.disableGems.active()) {
            m1 += (App.game.gems.getGemUpgrade(a1, this.valueToType(m1)) * GEM_UPGRADE_STEP);
            m2 += (App.game.gems.getGemUpgrade(a1, this.valueToType(m2)) * GEM_UPGRADE_STEP);
            m3 += (App.game.gems.getGemUpgrade(a2, this.valueToType(m3)) * GEM_UPGRADE_STEP);
            m4 += (App.game.gems.getGemUpgrade(a2, this.valueToType(m4)) * GEM_UPGRADE_STEP);
        }

        return Math.max(m1 * m2, m3 * m4);
    }

    public static typeToValue(type: TypeEffectiveness): TypeEffectivenessValue {
        return TypeEffectivenessValue[TypeEffectivenessValue[type]];
    }

    public static valueToType(value: TypeEffectivenessValue): TypeEffectiveness {
        switch (value) {
            case TypeEffectivenessValue.Immune:
                return TypeEffectiveness.Immune;
            case TypeEffectivenessValue.NotVery:
                return TypeEffectiveness.NotVery;
            case TypeEffectivenessValue.Very:
                return TypeEffectiveness.Very;
            case TypeEffectivenessValue.Neutral:
            default:
                return TypeEffectiveness.Neutral;
        }
    }
}
