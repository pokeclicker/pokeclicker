///<reference path="../GameConstants.d.ts"/>
///<reference path="Amount.ts"/>

abstract class AmountFactory {

    static createArray(amounts: number[], currency: GameConstants.Currency): Amount[] {
        const array = [];
        for (let i = 0; i < amounts.length; i++) {
            array.push(new Amount(amounts[i], currency));
        }
        return array;
    }
}
