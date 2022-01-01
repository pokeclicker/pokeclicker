class BattlePartyPokemon {
    constructor(
        public passiveAbility: Ability,
        public activeAbility : Ability,
        public heldIten: HeldItem,
        public pokemon: PartyPokemon
    ) {}
}
