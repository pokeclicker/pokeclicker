import PokemonType from '../enums/PokemonType';
import Challenge from './Challenge';

export default class MonotypeChallenge extends Challenge {
    // eslint-disable-next-line no-undef
    public pokemonType: KnockoutObservable<PokemonType> = ko.observable(PokemonType.Normal);

    constructor(type: string, description: string, pokemonType = PokemonType.Normal) {
        super(type, description);
        this.pokemonType = ko.observable(pokemonType);
    }
}
