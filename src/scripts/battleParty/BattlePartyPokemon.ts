class BattlePartyPokemon {
    constructor(
        public passiveAbility: Ability,
        public activeAbility : Ability,
        public heldItem: HeldItem,
        public pokemon: PartyPokemon,
        public status: Map<string, boolean> = new Map<string, boolean>()
    ) {
        if (this.pokemon.name.split(' ')[0] === 'Mega') {
            status['mega'] = true;
        }
    }
    getInfo() {
        return `
Pokemon : ${this.pokemon.name} <br />
Ability : ${this.passiveAbility.name} <br />
Description : ${this.passiveAbility.description}`;
    }
    getStatus() {
        if (this.status['mega']) {
            return 'assets/images/megasym.png';
        }
    }
}
