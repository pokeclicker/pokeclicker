import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import GymPokemon from './GymPokemon';
import PokemonType from '../enums/PokemonType';
import BattlePokemon from '../battles/BattlePokemon';
import EncounterType from '../enums/EncounterType';
import Amount from '../wallet/Amount';

export default class CustomGymPokemon extends GymPokemon {
    public displayName: string;

    constructor(
        displayName: string,
        maxHealth: number,
        level: number,
        public type: PokemonType[],
        requirements: Requirement | Requirement[] = [],
        shiny?: boolean,
        shadow = GameConstants.ShadowStatus.None,
    ) {
        super('MissingNo.', maxHealth, level, requirements, shiny, shadow);
        this.displayName = displayName;
    }

    public getBattlePokemon(): BattlePokemon {
        const type1 = this.type[0];
        const type2 = this.type[1] ?? PokemonType.None;

        const gender = 0; // to do

        return new BattlePokemon('MissingNo.', 0, type1, type2, this.maxHealth, this.level, 0, 0,
            new Amount(0, GameConstants.Currency.money), this.shiny, GameConstants.GYM_GEMS,
            gender, this.shadow, EncounterType.trainer, undefined, 0, this.displayName);
    }
}
