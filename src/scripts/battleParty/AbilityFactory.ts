class AbilityFactory {

    public static giveTypedBoost(type: PokemonType, amount: number) {
        if (PartySlots.boostPool[type]) {
            PartySlots.boostPool[type] += amount - 1;
        } else {
            PartySlots.boostPool[type] = amount;
        }
    }
    public static removeTypedBoost(type: PokemonType, amount: number) {
        PartySlots.boostPool[type] -= amount - 1;
    }

}
