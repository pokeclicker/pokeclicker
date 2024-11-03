///<reference path="../gym/GymPokemon.ts"/>

class ContestPokemon extends GymPokemon {
    nickname: string;
    contestTypes?: ContestType[];

    constructor(
        name: PokemonNameType,
        nickname: string,
        maxHealth: number,
        level: number,
        contestTypes?: ContestType[],
        requirements?: Requirement | Requirement[],
        shiny?: boolean,
    ) {
        super(name, maxHealth, level, requirements, shiny)
        this.nickname = nickname;
        this.contestTypes = contestTypes;
    }
}
