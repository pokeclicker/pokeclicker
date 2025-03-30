///<reference path="../gym/GymPokemon.ts"/>

class ContestPokemon extends GymPokemon {
    nickname: string;
    contestTypes?: ContestType[];
    gender?: GameConstants.BattlePokemonGender;

    constructor(
        name: PokemonNameType,
        nickname: string,
        maxHealth: number,
        level: number,
        contestTypes?: ContestType[],
        requirements?: Requirement | Requirement[],
        gender?: GameConstants.BattlePokemonGender, // only for visual differences
        shiny?: boolean
    ) {
        super(name, maxHealth, level, requirements, shiny);
        this.nickname = nickname;
        this.contestTypes = contestTypes;
        this.gender = gender;
    }
}
