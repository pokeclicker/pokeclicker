class AbilityFactory {
    public static giveTypedBoost(type: PokemonType, amount: number) {
        if (BattleParty.boostPool[type]) {
            BattleParty.boostPool[type] += amount - 1;
        } else {
            BattleParty.boostPool[type] = amount;
        }
    }
    public static removeTypedBoost(type: PokemonType, amount: number) {
        BattleParty.boostPool[type] -= amount - 1;
    }
}
