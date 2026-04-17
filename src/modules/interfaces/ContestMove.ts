import ContestType from '../enums/ContestType';

export default interface ContestMove {
    moveType: ContestType,
    pp: KnockoutObservable<number>,
}
