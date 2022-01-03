class BattlePartyPokemon {
    constructor(
        public passiveAbility: Ability,
        public activeAbility : Ability,
        public heldItem: HeldItem,
        public pokemon: PartyPokemon
    ) {}
}
