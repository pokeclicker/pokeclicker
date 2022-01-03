class AbilityFactory {
    public static giveTypedBoost(type: PokemonType, amount: number) {
        if (PartySlots.boostPool[PokemonType[type]]) {
            PartySlots.boostPool[PokemonType[type]] += amount - 1;
        } else {
            PartySlots.boostPool[PokemonType[type]] = amount;
        }
    }
    public static removeTypedBoost(type: PokemonType, amount: number) {
        PartySlots.boostPool[PokemonType[type]] -= amount - 1;
    }
}
