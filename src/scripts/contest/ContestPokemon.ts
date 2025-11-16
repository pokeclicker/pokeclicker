///<reference path="../gym/GymPokemon.ts"/>

export default class ContestPokemon extends GymPokemon {
    nickname: string;
    contestTypes?: ContestType[];
    moves?: ContestType[];
    gender?: GameConstants.BattlePokemonGender;
    money?: Amount;

    constructor(
        name: PokemonNameType,
        nickname: string,
        maxHealth = 5,
        level = Math.max(ContestRunner.rank() * 10, 1),
        contestTypes?: ContestType[],
        moves?: ContestType[],
        requirements?: Requirement | Requirement[],
        gender?: GameConstants.BattlePokemonGender, // only for visual differences, keeps the pokemon sprites consistent
        shiny = false, // also keep sprites consistent
        money = new Amount(Math.max(0, ContestRunner.rank() - 1) % 4 + 1 + Math.max(0,  ContestRunner.rank() - 8), GameConstants.Currency.contestToken)
    ) {
        super(name, maxHealth, level, requirements, shiny);
        this.nickname = nickname;
        this.contestTypes = contestTypes;
        this.moves = moves;
        this.gender = gender;
        this.money = money;
    }
}
