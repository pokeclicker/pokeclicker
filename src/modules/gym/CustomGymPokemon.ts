import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import GymPokemon from './GymPokemon';
import PokemonType from '../enums/PokemonType';
import BattlePokemon from '../battles/BattlePokemon';
import EncounterType from '../enums/EncounterType';
import Amount from '../wallet/Amount';
import GameHelper from '../GameHelper';

export default class CustomGymPokemon extends GymPokemon {
    constructor(
        private displayName: string,
        maxHealth: number,
        level: number,
        private type: PokemonType[],
        requirements: Requirement | Requirement[] = [],
        shiny?: boolean,
        private image?: string,
    ) {
        super('MissingNo.', maxHealth, level, requirements, shiny, GameConstants.ShadowStatus.None);
    }

    public getBattlePokemon(
        encounterType: EncounterType = EncounterType.trainer,
        shinyChance: number = GameConstants.SHINY_CHANCE_BATTLE,
        healthOverride?: number,
        levelOverride?: number,
        epOverride?: number,
        gemsOverride: number = GameConstants.GYM_GEMS,
    ): BattlePokemon {
        const type1 = this.type[0];
        const type2 = this.type[1] ?? PokemonType.None;
        const shiny = this.shiny ? this.shiny : PokemonFactory.generateShiny(shinyChance);
        const gender = GameConstants.BattlePokemonGender.NoGender;

        if (shiny && !this.shiny && encounterType === EncounterType.trainer) {
            GameHelper.incrementObservable(App.game.statistics.totalShinyTrainerPokemonSeen);
        }

        const maxHealth = healthOverride ?? this.maxHealth;
        const level = levelOverride ?? this.level;
        const ep = epOverride ?? 0;
        const imagePath = `${shiny ? 'shiny' : ''}custompokemon/${this.image}`;

        return new BattlePokemon('MissingNo.', 0, type1, type2, maxHealth, level, 0, 0,
            new Amount(0, GameConstants.Currency.money), shiny, gemsOverride, gender,
            this.shadow, encounterType, undefined, ep, this.displayName, imagePath, false);
    }
}
