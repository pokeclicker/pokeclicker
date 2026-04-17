import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import type { PokemonNameType } from '../pokemons/PokemonNameType';
import BattlePokemon from '../battles/BattlePokemon';
import EncounterType from '../enums/EncounterType';
import GameHelper from '../GameHelper';
import Amount from '../wallet/Amount';

export default class GymPokemon {
    name: PokemonNameType;
    maxHealth: number;
    level: number;
    shiny: boolean;
    shadow: GameConstants.ShadowStatus;
    requirements: Requirement[];

    constructor(name: PokemonNameType, maxHealth: number, level: number, requirements: Requirement | Requirement[] = [], shiny?: boolean, shadow = GameConstants.ShadowStatus.None) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.level = level;
        if (requirements instanceof Requirement) {
            this.requirements = [requirements];
        } else {
            this.requirements = requirements;
        }
        this.shiny = shiny;
        this.shadow = shadow;
    }

    public getBattlePokemon(): BattlePokemon {
        const basePokemon = PokemonHelper.getPokemonByName(this.name);

        const exp: number = basePokemon.exp;
        const shiny = this.shiny ? this.shiny : PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        const gender = PokemonFactory.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        const shadow = this.shadow;
        const catchRate: number = PokemonFactory.catchRateHelper(basePokemon.catchRate);
        if (shiny && !this.shiny) {
            GameHelper.incrementObservable(App.game.statistics.totalShinyTrainerPokemonSeen);
        }

        return new BattlePokemon(this.name, basePokemon.id, basePokemon.type1, basePokemon.type2,
            this.maxHealth, this.level, catchRate, exp, new Amount(0, GameConstants.Currency.money),
            shiny, GameConstants.GYM_GEMS, gender, shadow, EncounterType.trainer);
    }
}
