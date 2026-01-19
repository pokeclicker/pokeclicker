import ContestType from '../enums/ContestType';
import { BattlePokemonGender } from '../GameConstants';
import GymPokemon from '../gym/GymPokemon';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from '../requirements/Requirement';

export default class ContestPokemon extends GymPokemon {
    nickname: string;
    contestTypes?: ContestType[];
    moves?: ContestType[];
    gender?: BattlePokemonGender;

    constructor(
        name: PokemonNameType,
        nickname: string,
        contestTypes?: ContestType[],
        moves?: ContestType[],
        requirements?: Requirement | Requirement[],
        gender?: BattlePokemonGender, // only for visual differences, keeps the pokemon sprites consistent
        shiny = false, // also keep sprites consistent
        maxHealth = 5, // maxRapport will default to maxHealth's value, according to BattlePokemon
        level = 10, // not used but still needed for GymPokemon, exp gain is calculated through gameplay instead of level
    ) {
        super(name, maxHealth, level, requirements, shiny);
        this.nickname = nickname;
        this.contestTypes = contestTypes;
        this.moves = moves;
        this.gender = gender;
    }
}
