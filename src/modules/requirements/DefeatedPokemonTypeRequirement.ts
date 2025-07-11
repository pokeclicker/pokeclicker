import { PureComputed } from 'knockout';
import PokemonType from '../enums/PokemonType';
import * as GameConstants from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import AchievementRequirement from './AchievementRequirement';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class DefeatedPokemonTypeRequirement extends AchievementRequirement {
    private pokemonList: PokemonNameType[];
    private focus: PureComputed<number>;

    constructor(
        private type: PokemonType,
        requiredValue: number,
        private monoType: boolean = false,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more,
    ) {
        super(requiredValue, option);

        this.pokemonList = pokemonMap.filter((p) => p.type.includes(this.type) && (!this.monoType || (this.monoType && p.type.length == 1))).map(p => p.name);
        this.focus = ko.pureComputed((): number => {
            return this.pokemonList.reduce((total, p) => total + App.game.statistics.pokemonDefeated[pokemonMap[p].id](), 0);
        }).extend({ rateLimit: 500 });
    }

    public getProgress() {
        return Math.min(this.focus(), this.requiredValue);
    }

    public hint(): string {
        return `Defeat ${this.requiredValue.toLocaleString('en-US')} ${this.monoType ? 'pure ' : ''}${PokemonType[this.type]}-type Pokémon.`;
    }
}
