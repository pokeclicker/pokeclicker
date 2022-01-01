class AbilityFactory {
    public static giveTypedBoost(type: PokemonType, amount: number) {
        BattleParty.boostPool[type] += amount;
    }
    public static removeTypedBoost(type: PokemonType, amount: number) {
        BattleParty.boostPool[type] -= amount;
    }
}
