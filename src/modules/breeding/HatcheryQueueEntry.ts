import { HatcheryQueueEntryName } from './HatcheryNameTypes';
import HatcheryTypeGuards from './HatcheryTypeGuards';

export default class HatcheryQueueEntry {
    constructor(public name: HatcheryQueueEntryName) { }

    public getQueueEggImage(): string {
        if (HatcheryTypeGuards.isHatcheryPokemon(this.name)) {
            const pokemon = App.game.party.caughtPokemon.find((p) => p.name === this.name, this);
            const imagePath = pokemon.shiny ? 'shinypokemon' : 'pokemon';

            return `assets/images/${imagePath}/${pokemon.id}.png`;
        }

        if (HatcheryTypeGuards.isHatcheryEgg(this.name)) {
            return `assets/images/breeding/${this.name}_egg.png`;
        }

        // Should be only fossils
        return `assets/images/breeding/${this.name}.png`;
    }
}
