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

    public static getAttackModifier(a1: GameConstants.PokemonType, a2: GameConstants.PokemonType, d1: GameConstants.PokemonType, d2: GameConstants.PokemonType): number {

        if (a1 == GameConstants.PokemonType.None || d1 == GameConstants.PokemonType.None) {
            return 1;
        }

        let attackType1 = GameConstants.PokemonType[a1];
        let attackType2 = GameConstants.PokemonType[a2];
        let defendType1 = GameConstants.PokemonType[d1];
        let defendType2 = GameConstants.PokemonType[d2];

        let list = player.shardUpgrades;
        //TODO factor in shard value
        let m1 = TypeHelper.typeMatrix[attackType1][defendType1];
        m1 += (list[attackType1][this.valueToType(m1)]() * GameConstants.SHARD_UPGRADE_STEP);

        let m2 = 1, m3 = 1, m4 = 1;
        if (d2 != GameConstants.PokemonType.None) {
            m2 = TypeHelper.typeMatrix[attackType1][defendType2];
            m2 += (list[attackType1][this.valueToType(m2)]() * GameConstants.SHARD_UPGRADE_STEP);
        }

        if (a2 != GameConstants.PokemonType.None) {
            m3 = TypeHelper.typeMatrix[attackType2][defendType1];
            m3 += (list[attackType2][this.valueToType(m3)]() * GameConstants.SHARD_UPGRADE_STEP);
        }

        if (a2 != GameConstants.PokemonType.None && d2 != GameConstants.PokemonType.None) {
            let m4 = TypeHelper.typeMatrix[attackType2][defendType2];
            m4 += (list[attackType2][this.valueToType(m4)]() * GameConstants.SHARD_UPGRADE_STEP);
        }

        return m1 * m2 * m3 * m4;
    }

    public static typeToValue(type: GameConstants.TypeEffectiveness): GameConstants.TypeEffectivenessValue {
        return GameConstants.TypeEffectivenessValue[GameConstants.TypeEffectivenessValue[type]];
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

    public static readonly typeColors = [
        "595c3b", // Normal
        "b10818", // Fire
        "294a94", // Water
        "b57b31", // Electric
        "4a944a", // Grass
        "42a59c", // Ice
        "b54a4a", // Fighting
        "7b42c6", // Poison
        "946b4a", // Ground
        "218cb5", // Flying
        "ce6363", // Psychic
        "8cb521", // Bug
        "a58c4a", // Rock
        "605a72", // Ghost
        "8c424a", // Dragon
        "4a6b84", // Dark
        "737373", // Steel
        "d694ce"  // Fairy
    ];

    public static readonly typeColorsLocked = [
        "9da07d", // Normal
        "f85858", // Fire
        "6b94ff", // Water
        "ffc663", // Electric
        "73e763", // Grass
        "b5efef", // Ice
        "e78c6b", // Fighting
        "c684ff", // Poison
        "cead7b", // Ground
        "4ac6ff", // Flying
        "ffb5ad", // Psychic
        "cef77b", // Bug
        "d6bd94", // Rock
        "948cad", // Ghost
        "ce6363", // Dragon
        "7394b5", // Dark
        "aaaaaa", // Steel
        "ffc6e7"  // Fairy
    ];
}
