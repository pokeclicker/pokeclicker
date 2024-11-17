/// <reference path="../Quest.ts" />

class TrainSpecificPokemonQuest extends Quest implements QuestInterface {
    pokemon: PokemonListData;
    includeBreeding: boolean;

    constructor(pokemonName: PokemonNameType, attackNeeded: number, reward = 0) {
        super(attackNeeded, reward);
        this.pokemon = pokemonMap[pokemonName];
        this.focus = ko.pureComputed(() => App.game.party.getPokemonByName(pokemonName).attack);
        this.initialValue = 0;
    }

    get description(): string {
        if (this.customDescription) {
            return this.customDescription;
        }
        return `Train ${this.pokemon.name} to ${this.amount} attack.`;
    }
}
