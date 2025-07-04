///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class PokerusStatusByFilterRequirement extends AchievementRequirement {
    constructor(
        public filter: (pokemon: PartyPokemon) => boolean,
        amount: number,
        public statusRequired: GameConstants.Pokerus
    ) {
        super(amount, GameConstants.AchievementOption.more, GameConstants.AchievementType.Pokerus);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter(p => this.filter(p) && p.pokerus >= this.statusRequired).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokémon needs to be infected.`;
    }
}
