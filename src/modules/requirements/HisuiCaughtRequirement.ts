import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class HisuiCaughtRequirement extends AchievementRequirement {
    constructor(value: number, private shiny: boolean) {
        super(value, GameConstants.AchievementOption.more, shiny ? GameConstants.AchievementType['Shiny Pokemon'] : GameConstants.AchievementType['Caught Pokemon']);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon
            .filter((p) => p.name.includes('Hisuian')
            || p.name.includes('Noble')
            || p.name === 'Dialga (Origin)'
            || p.name === 'Palkia (Origin)'
            || p.name === 'Giratina (Origin)'
            || p.name === 'Arceus (Fire)'
            || p.name === 'Arceus (Water)'
            || p.name === 'Arceus (Electric)'
            || p.name === 'Arceus (Grass)'
            || p.name === 'Arceus (Ice)'
            || p.name === 'Arceus (Fighting)'
            || p.name === 'Arceus (Poison)'
            || p.name === 'Arceus (Ground)'
            || p.name === 'Arceus (Flying)'
            || p.name === 'Arceus (Psychic)'
            || p.name === 'Arceus (Bug)'
            || p.name === 'Arceus (Rock)'
            || p.name === 'Arceus (Ghost)'
            || p.name === 'Arceus (Dragon)'
            || p.name === 'Arceus (Dark)'
            || p.name === 'Arceus (Steel)'
            || p.name === 'Arceus (Fairy)'
            || p.name === 'Basculin (White-Striped)'
            || p.name === 'Wyrdeer'
            || p.name === 'Kleavor'
            || p.name === 'Ursaluna'
            || p.name === 'Basculegion (Male)'
            || p.name === 'Basculegion (Female)'
            || p.name === 'Sneasler'
            || p.name === 'Overqwil'
            || p.name === 'Enamorus'
            || p.name === 'Enamorus (Therian)')
            .filter((p) => p.shiny || !this.shiny).length,
        this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
