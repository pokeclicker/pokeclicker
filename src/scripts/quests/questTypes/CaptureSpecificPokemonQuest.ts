/// <reference path="../Quest.ts" />

class CaptureSpecificPokemonQuest extends Quest implements QuestInterface {
    pokemon: PokemonListData;
    customReward: () => void;
    includeBreeding: boolean;

    constructor(pokemonName: PokemonNameType, capturesNeeded = 1, includeBreeding = false, reward = 0) {
        super(capturesNeeded, reward);
        this.pokemon = pokemonMap[pokemonName];
        this.focus = ko.pureComputed(() => App.game.statistics.pokemonCaptured[this.pokemon.id]() - (includeBreeding ? 0 : App.game.statistics.pokemonHatched[this.pokemon.id]()));
        this.includeBreeding = includeBreeding;
    }

    get defaultDescription(): string {
        if (this.amount === 1) {
            return `Capture ${this.includeBreeding ? 'or hatch ' : ''}${this.pokemon.name}.`;
        }
        return `Capture ${this.includeBreeding ? 'or hatch ' : ''}${this.pokemon.name} ${this.amount} times.`;
    }

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        return super.claim();
    }
}
