class TypeHelper {

    //@formatter:off
    /*eslint-disable */

    public static typeMatrix: Array<Array<number>> = (()=>{
        const ΞΞ = GameConstants.TypeEffectivenessValue.Immune;
        const VV = GameConstants.TypeEffectivenessValue.NotVery;
        const ʘʘ = GameConstants.TypeEffectivenessValue.Normal;
        const ΛΛ = GameConstants.TypeEffectivenessValue.Very;
        return [
            //                 E              F
            //                 L              I                   P
            //  N              E              G    P    G    F    S                   D
            //  O         W    C    G         H    O    R    L    Y              G    R         S    F  <- Defending type
            //  R    F    A    T    R         T    I    O    Y    C         R    H    A    D    T    A
            //  M    I    T    R    A    I    I    S    U    I    H    B    O    O    G    A    E    I   Attack type
            //  A    R    E    I    S    C    N    O    N    N    I    U    C    S    O    R    E    R        |
            //  L    E    R    C    S    E    G    N    D    G    C    G    K    T    N    K    L    Y        v
            [  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ΞΞ,  ʘʘ,  ʘʘ,  VV,  ʘʘ], // NORMAL
            [  ʘʘ,  VV,  VV,  ʘʘ,  ΛΛ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  VV,  ʘʘ,  VV,  ʘʘ,  ΛΛ,  ʘʘ], // FIRE
            [  ʘʘ,  ΛΛ,  VV,  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ʘʘ], // WATER
            [  ʘʘ,  ʘʘ,  ΛΛ,  VV,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  ΞΞ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ʘʘ], // ELECTRIC
            [  ʘʘ,  VV,  ΛΛ,  ʘʘ,  VV,  ʘʘ,  ʘʘ,  VV,  ΛΛ,  VV,  ʘʘ,  VV,  ΛΛ,  ʘʘ,  VV,  ʘʘ,  VV,  ʘʘ], // GRASS
            [  ʘʘ,  VV,  VV,  ʘʘ,  ΛΛ,  VV,  ʘʘ,  ʘʘ,  ΛΛ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  ʘʘ], // ICE
            [  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  ʘʘ,  VV,  VV,  VV,  ΛΛ,  ΞΞ,  ʘʘ,  ΛΛ,  ΛΛ,  VV], // FIGHTING
            [  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  VV,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  VV,  ʘʘ,  ʘʘ,  ΞΞ,  ΛΛ], // POISON
            [  ʘʘ,  ΛΛ,  ʘʘ,  ΛΛ,  VV,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  ΞΞ,  ʘʘ,  VV,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ], // GROUND
            [  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ΛΛ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ʘʘ], // FLYING
            [  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ΛΛ,  ʘʘ,  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΞΞ,  VV,  ʘʘ], // PSYCHIC
            [  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  VV,  ʘʘ,  VV,  ΛΛ,  ʘʘ,  ʘʘ,  VV,  ʘʘ,  ΛΛ,  VV,  VV], // BUG
            [  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  VV,  ʘʘ,  VV,  ΛΛ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ʘʘ], // ROCK
            [  ΞΞ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  ʘʘ,  ʘʘ], // GHOST
            [  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  ΞΞ], // DRAGON
            [  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  VV,  ʘʘ,  VV], // DARK
            [  ʘʘ,  VV,  VV,  VV,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ʘʘ,  ʘʘ,  ʘʘ,  VV,  ΛΛ], // STEEL
            [  ʘʘ,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  VV,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ʘʘ,  ΛΛ,  ΛΛ,  VV,  ʘʘ], // FAIRY
        ]
    })();
    //@formatter:on
    /*eslint-enable */

    public static getAttackModifier(a1: PokemonType, a2: PokemonType, d1: PokemonType, d2: PokemonType): number {

        if (a1 == PokemonType.None || d1 == PokemonType.None) {
            return 1;
        }

        //TODO factor in shard value
        let m1 = TypeHelper.typeMatrix[a1][d1];
        m1 += (App.game.shards.getShardUpgrade(a1, this.valueToType(m1)) * Shards.SHARD_UPGRADE_STEP);

        let m2 = 1, m3 = 1, m4 = 1;
        if (d2 != PokemonType.None) {
            m2 = TypeHelper.typeMatrix[a1][d2];
            m2 += (App.game.shards.getShardUpgrade(a1, this.valueToType(m2)) * Shards.SHARD_UPGRADE_STEP);
        }

        if (a2 != PokemonType.None) {
            m3 = TypeHelper.typeMatrix[a2][d1];
            m3 += (App.game.shards.getShardUpgrade(a2, this.valueToType(m3)) * Shards.SHARD_UPGRADE_STEP);
        }

        if (a2 != PokemonType.None && d2 != PokemonType.None) {
            m4 = TypeHelper.typeMatrix[a2][d2];
            m4 += (App.game.shards.getShardUpgrade(a2, this.valueToType(m4)) * Shards.SHARD_UPGRADE_STEP);
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
        'd694ce',  // Fairy
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
        'ffc6e7',  // Fairy
    ];
}
