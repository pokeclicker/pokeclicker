class TypeHelper {

    //@formatter:off
    public static typeMatrix : Array<Array<number>> = [
        //                E              F
        //                L              I                   P
        // N              E              G    P    G    F    S                   D
        // O         W    C    G         H    O    R    L    Y              G    R         S    F  <- Defending type
        // R    F    A    T    R         T    I    O    Y    C         R    H    A    D    T    A
        // M    I    T    R    A    I    I    S    U    I    H    B    O    O    G    A    E    I   Attack type
        // A    R    E    I    S    C    N    O    N    N    I    U    C    S    O    R    E    R        |
        // L    E    R    C    S    E    G    N    D    G    C    G    K    T    N    K    L    Y        v
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   0,   1,   1, 0.5,   1], // NORMAL
        [  1, 0.5, 0.5,   1,   2,   2,   1,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1], // FIRE
        [  1,   2, 0.5,   1, 0.5,   1,   1,   1,   2,   1,   1,   1,   2,   1, 0.5,   1,   1,   1], // WATER
        [  1,   1,   2, 0.5, 0.5,   1,   1,   1,   0,   2,   1,   1,   1,   1, 0.5,   1,   1,   1], // ELECTRIC
        [  1, 0.5,   2,   1, 0.5,   1,   1, 0.5,   2, 0.5,   1, 0.5,   2,   1, 0.5,   1, 0.5,   1], // GRASS
        [  1, 0.5, 0.5,   1,   2, 0.5,   1,   1,   2,   2,   1,   1,   1,   1,   2,   1, 0.5,   1], // ICE
        [  2,   1,   1,   1,   1,   2,   1, 0.5,   1, 0.5, 0.5, 0.5,   2,   0,   1,   2,   2, 0.5], // FIGHTING
        [  1,   1,   1,   1,   2,   1,   1, 0.5, 0.5,   1,   1,   1, 0.5, 0.5,   1,   1,   0,   2], // POISON
        [  1,   2,   1,   2, 0.5,   1,   1,   2,   1,   0,   1, 0.5,   2,   1,   1,   1,   2,   1], // GROUND
        [  1,   1,   1, 0.5,   2,   1,   2,   1,   1,   1,   1,   2, 0.5,   1,   1,   1, 0.5,   1], // FLYING
        [  1,   1,   1,   1,   1,   1,   2,   2,   1,   1, 0.5,   1,   1,   1,   1,   0, 0.5,   1], // PSYCHIC
        [  1, 0.5,   1,   1,   2,   1, 0.5, 0.5,   1, 0.5,   2,   1,   1, 0.5,   1,   2, 0.5, 0.5], // BUG
        [  1,   2,   1,   1,   1,   2, 0.5,   1, 0.5,   2,   1,   2,   1,   1,   1,   1, 0.5,   1], // ROCK
        [  0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1], // GHOST
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   0], // DRAGON
        [  1,   1,   1,   1,   1,   1, 0.5,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1, 0.5], // DARK
        [  1, 0.5, 0.5, 0.5,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1, 0.5,   2], // STEEL
        [  1, 0.5,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   1,   2,   2, 0.5,   1], // FAIRY
    ];
    //@formatter:on

    public static getAttackModifier(attackType1: number, attackType2: number, defendType1: number, defendType2: number): number {
        let list = player._shards;
        let m1 = this.typeMatrix[attackType1][defendType1];
        m1 += list[attackType1][this.valueToType(m1)];
        let m2 = this.typeMatrix[attackType1][defendType2];
        m2 += list[attackType1][this.valueToType(m2)];
        let m3 = this.typeMatrix[attackType2][defendType1];
        m3 += list[attackType2][this.valueToType(m3)];
        let m4 = this.typeMatrix[attackType2][defendType2];
        m4 += list[attackType2][this.valueToType(m4)];

        return m1 + m2 + m3 + m4;
    }

    public static typeToValue(type: GameConstants.TypeEffectiveness) {

    }

    public static valueToType(value: GameConstants.TypeEffectivenessValue): GameConstants.TypeEffectiveness {
        switch (value) {
            case GameConstants.TypeEffectivenessValue.Immune :
                return GameConstants.TypeEffectiveness.Immune;
            case GameConstants.TypeEffectivenessValue.NotVery :
                return GameConstants.TypeEffectiveness.NotVery;
            case GameConstants.TypeEffectivenessValue.Normal :
                return GameConstants.TypeEffectiveness.Normal;
            case GameConstants.TypeEffectivenessValue.Very :
                return GameConstants.TypeEffectiveness.Very;
        }
    }
}