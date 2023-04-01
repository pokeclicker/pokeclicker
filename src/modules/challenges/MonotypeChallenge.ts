import PokemonType from '../enums/PokemonType';
import Requirement from '../requirements/Requirement';
import Challenge from './Challenge';

export default class MonotypeChallenge extends Challenge {
    // eslint-disable-next-line no-undef
    public pokemonType: KnockoutObservable<PokemonType> = ko.observable(PokemonType.Normal);

    constructor(type: string, description: string, requirement?: Requirement, pokemonType = PokemonType.Normal) {
        super(type, description, false, requirement);
        this.pokemonType = ko.observable(pokemonType);
    }
}