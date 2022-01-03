class TypeHelper {

    //@formatter:off
    /*eslint-disable */

    public static typeMatrix: Array<Array<number>> = (()=>{
        const imm = GameConstants.TypeEffectivenessValue.Immune;
        const not = GameConstants.TypeEffectivenessValue.NotVery;
        const nrm = GameConstants.TypeEffectivenessValue.Normal;
        const vry = GameConstants.TypeEffectivenessValue.Very;
        return [
            //                 E              F
            //                 L              I                   P
            //  N              E              G    P    G    F    S                   D
            //  O         W    C    G         H    O    R    L    Y              G    R         S    F  <- Defending type
            //  R    F    A    T    R         T    I    O    Y    C         R    H    A    D    T    A
            //  M    I    T    R    A    I    I    S    U    I    H    B    O    O    G    A    E    I   Attack type
            //  A    R    E    I    S    C    N    O    N    N    I    U    C    S    O    R    E    R        |
            //  L    E    R    C    S    E    G    N    D    G    C    G    K    T    N    K    L    Y        v
            [ nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, not, imm, nrm, nrm, not, nrm], // NORMAL
            [ nrm, not, not, nrm, vry, vry, nrm, nrm, nrm, nrm, nrm, vry, not, nrm, not, nrm, vry, nrm], // FIRE
            [ nrm, vry, not, nrm, not, nrm, nrm, nrm, vry, nrm, nrm, nrm, vry, nrm, not, nrm, nrm, nrm], // WATER
            [ nrm, nrm, vry, not, not, nrm, nrm, nrm, imm, vry, nrm, nrm, nrm, nrm, not, nrm, nrm, nrm], // ELECTRIC
            [ nrm, not, vry, nrm, not, nrm, nrm, not, vry, not, nrm, not, vry, nrm, not, nrm, not, nrm], // GRASS
            [ nrm, not, not, nrm, vry, not, nrm, nrm, vry, vry, nrm, nrm, nrm, nrm, vry, nrm, not, nrm], // ICE
            [ vry, nrm, nrm, nrm, nrm, vry, nrm, not, nrm, not, not, not, vry, imm, nrm, vry, vry, not], // FIGHTING
            [ nrm, nrm, nrm, nrm, vry, nrm, nrm, not, not, nrm, nrm, nrm, not, not, nrm, nrm, imm, vry], // POISON
            [ nrm, vry, nrm, vry, not, nrm, nrm, vry, nrm, imm, nrm, not, vry, nrm, nrm, nrm, vry, nrm], // GROUND
            [ nrm, nrm, nrm, not, vry, nrm, vry, nrm, nrm, nrm, nrm, vry, not, nrm, nrm, nrm, not, nrm], // FLYING
            [ nrm, nrm, nrm, nrm, nrm, nrm, vry, vry, nrm, nrm, not, nrm, nrm, nrm, nrm, imm, not, nrm], // PSYCHIC
            [ nrm, not, nrm, nrm, vry, nrm, not, not, nrm, not, vry, nrm, nrm, not, nrm, vry, not, not], // BUG
            [ nrm, vry, nrm, nrm, nrm, vry, not, nrm, not, vry, nrm, vry, nrm, nrm, nrm, nrm, not, nrm], // ROCK
            [ imm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, vry, nrm, nrm, vry, nrm, not, nrm, nrm], // GHOST
            [ nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, nrm, vry, nrm, not, imm], // DRAGON
            [ nrm, nrm, nrm, nrm, nrm, nrm, not, nrm, nrm, nrm, vry, nrm, nrm, vry, nrm, not, nrm, not], // DARK
            [ nrm, not, not, not, nrm, vry, nrm, nrm, nrm, nrm, nrm, nrm, vry, nrm, nrm, nrm, not, vry], // STEEL
            [ nrm, not, nrm, nrm, nrm, nrm, vry, not, nrm, nrm, nrm, nrm, nrm, nrm, vry, vry, not, nrm], // FAIRY
        ]
    })();
    //@formatter:on
    /*eslint-enable */

    public static getAttackModifier(a1: PokemonType, a2: PokemonType, d1: PokemonType, d2: PokemonType): number {

        if (a1 == PokemonType.None || d1 == PokemonType.None) {
            return 1;
        }

        // Apply second type as the first type when None
        a2 = a2 != PokemonType.None ? a2 : a1;
        d2 = d2 != PokemonType.None ? d2 : d1;

        let m1 = TypeHelper.typeMatrix[a1][d1];
        let m2 = TypeHelper.typeMatrix[a1][d2];
        let m3 = TypeHelper.typeMatrix[a2][d1];
        let m4 = TypeHelper.typeMatrix[a2][d2];

        if (!App.game.challenges.list.disableShards.active()) {
            m1 += (App.game.shards.getShardUpgrade(a1, this.valueToType(m1)) * Shards.SHARD_UPGRADE_STEP);
            m2 += (App.game.shards.getShardUpgrade(a1, this.valueToType(m2)) * Shards.SHARD_UPGRADE_STEP);
            m3 += (App.game.shards.getShardUpgrade(a2, this.valueToType(m3)) * Shards.SHARD_UPGRADE_STEP);
            m4 += (App.game.shards.getShardUpgrade(a2, this.valueToType(m4)) * Shards.SHARD_UPGRADE_STEP);
        }

        if (PartySlots.boostPool[a1]) {
            m1 *= PartySlots.boostPool[PokemonType[a1]];
            m2 *= PartySlots.boostPool[PokemonType[a1]];
        }
        if (PartySlots.boostPool[a2]) {
            m3 *= PartySlots.boostPool[PokemonType[a2]];
            m4 *= PartySlots.boostPool[PokemonType[a2]];
        }

        return Math.max(m1 * m2, m3 * m4);
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
}
