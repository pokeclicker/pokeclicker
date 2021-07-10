/// <reference path="../GameConstants.d.ts"/>
/// <reference path="./Amount.d.ts"/>
declare abstract class AmountFactory {
    static createArray(amounts: number[], currency: Currency): Amount[];
}
