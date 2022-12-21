/// <reference path="../Quest.ts" />

class CaptureSpecificPokemonQuest extends Quest implements QuestInterface {
    pokemon: PokemonListData;
    customDescription: string;
    customReward: () => void;

    constructor(pokemonName: PokemonNameType, description: string = undefined, capturesNeeded = 1, includeBreeding = false, reward: (() => void) | number = undefined, onload: () => void = undefined) {
        const qpReward = typeof reward == 'number' ? reward : 0;
        super(capturesNeeded, qpReward);
        if (typeof reward != 'number') {
            this.customReward = reward;
        }
        this.pokemon = pokemonMap[pokemonName];
        this.customDescription = description;
        this.focus = ko.pureComputed(() => App.game.statistics.pokemonCaptured[this.pokemon.id]() - (includeBreeding ? 0 : App.game.statistics.pokemonHatched[this.pokemon.id]()));
        this._onLoad = onload;
    }

    get description(): string {
        if (this.customDescription) {
            return this.customDescription;
        }
        if (this.amount === 1) {
            return `Capture ${this.pokemon.name}.`;
        }
        return `Capture ${this.pokemon.name} ${this.amount} times.`;
    }

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        return super.claim();
    }
}
