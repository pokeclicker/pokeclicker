class BattlePartyPokemon {
    constructor(
        public passiveAbility: IPassiveAbility,
        public activeAbility : IActiveAbility,
        public heldIten: HeldItem,
        public pokemon: PartyPokemon
    ) {}
}
